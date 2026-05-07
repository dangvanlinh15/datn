package com.datn.api.controller;

import com.datn.api.dto.ChatConversationDto;
import com.datn.api.dto.ChatMessageDto;
import com.datn.api.model.ChatMessage;
import com.datn.api.model.UserInfo;
import com.datn.api.repository.ChatMessageRepository;
import com.datn.api.repository.UserInfoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class ChatController {
    private final ChatMessageRepository chatMessageRepository;
    private final UserInfoRepository userInfoRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(
            ChatMessageRepository chatMessageRepository,
            UserInfoRepository userInfoRepository,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.chatMessageRepository = chatMessageRepository;
        this.userInfoRepository = userInfoRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping("/chat/customers")
    public ResponseEntity<List<ChatConversationDto>> getCustomers(@RequestParam(required = false) String currentUserId) {
        List<ChatConversationDto> customers = userInfoRepository.findAll()
                .stream()
                .filter(userInfo -> currentUserId == null || !currentUserId.equals(userInfo.getId()))
                .map(userInfo -> buildConversation(currentUserId, userInfo))
                .sorted(Comparator.comparing(ChatConversationDto::getLastMessageAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());

        return ResponseEntity.ok(customers);
    }

    @GetMapping("/chat/conversations/{userId}")
    public ResponseEntity<List<ChatConversationDto>> getConversations(@PathVariable String userId) {
        Map<String, ChatConversationDto> conversations = new LinkedHashMap<>();

        chatMessageRepository.findBySenderIdOrRecipientId(userId, userId)
                .stream()
                .sorted(Comparator.comparing(ChatMessage::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .forEach(message -> {
                    String partnerId = userId.equals(message.getSenderId()) ? message.getRecipientId() : message.getSenderId();
                    if (partnerId == null || conversations.containsKey(partnerId)) {
                        return;
                    }

                    Optional<UserInfo> partnerInfo = userInfoRepository.findById(partnerId);
                    ChatConversationDto conversation = new ChatConversationDto();
                    conversation.setConversationId(message.getConversationId());
                    conversation.setUserId(partnerId);
                    conversation.setName(partnerInfo.map(this::getDisplayName).orElse(
                            userId.equals(message.getSenderId()) ? message.getRecipientName() : message.getSenderName()
                    ));
                    conversation.setPhone(partnerInfo.map(UserInfo::getPhone).orElse(""));
                    conversation.setLastMessage(message.getContent());
                    conversation.setLastMessageAt(message.getCreatedAt());
                    conversations.put(partnerId, conversation);
                });

        return ResponseEntity.ok(List.copyOf(conversations.values()));
    }

    @GetMapping("/chat/messages")
    public ResponseEntity<List<ChatMessageDto.ResponseDto>> getMessages(
            @RequestParam String userId,
            @RequestParam String recipientId
    ) {
        String conversationId = buildConversationId(userId, recipientId);
        List<ChatMessageDto.ResponseDto> messages = chatMessageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(messages);
    }

    @PostMapping("/chat/messages")
    public ResponseEntity<ChatMessageDto.ResponseDto> createMessage(@RequestBody ChatMessageDto.RequestDto requestDto) {
        return ResponseEntity.status(201).body(saveAndPublishMessage(requestDto));
    }

    @MessageMapping("/chat.send")
    public void sendMessage(ChatMessageDto.RequestDto requestDto) {
        saveAndPublishMessage(requestDto);
    }

    private ChatMessageDto.ResponseDto saveAndPublishMessage(ChatMessageDto.RequestDto requestDto) {
        ChatMessage message = new ChatMessage();
        message.setSenderId(requestDto.getSenderId());
        message.setSenderName(requestDto.getSenderName());
        message.setRecipientId(requestDto.getRecipientId());
        message.setRecipientName(requestDto.getRecipientName());
        message.setContent(requestDto.getContent());
        message.setCreatedAt(LocalDateTime.now());
        message.setConversationId(buildConversationId(requestDto.getSenderId(), requestDto.getRecipientId()));

        ChatMessage savedMessage = chatMessageRepository.save(message);
        ChatMessageDto.ResponseDto responseDto = toResponse(savedMessage);
        messagingTemplate.convertAndSend("/topic/chat/" + savedMessage.getConversationId(), responseDto);
        return responseDto;
    }

    private ChatConversationDto buildConversation(String currentUserId, UserInfo userInfo) {
        ChatConversationDto conversation = new ChatConversationDto();
        conversation.setConversationId(currentUserId == null ? null : buildConversationId(currentUserId, userInfo.getId()));
        conversation.setUserId(userInfo.getId());
        conversation.setName(getDisplayName(userInfo));
        conversation.setPhone(userInfo.getPhone());

        if (currentUserId != null) {
            chatMessageRepository.findTopByConversationIdOrderByCreatedAtDesc(conversation.getConversationId())
                    .ifPresent(message -> {
                        conversation.setLastMessage(message.getContent());
                        conversation.setLastMessageAt(message.getCreatedAt());
                    });
        }

        return conversation;
    }

    private ChatMessageDto.ResponseDto toResponse(ChatMessage message) {
        ChatMessageDto.ResponseDto responseDto = new ChatMessageDto.ResponseDto();
        responseDto.setId(message.getId());
        responseDto.setConversationId(message.getConversationId());
        responseDto.setSenderId(message.getSenderId());
        responseDto.setSenderName(message.getSenderName());
        responseDto.setRecipientId(message.getRecipientId());
        responseDto.setRecipientName(message.getRecipientName());
        responseDto.setContent(message.getContent());
        responseDto.setCreatedAt(message.getCreatedAt());
        return responseDto;
    }

    private String getDisplayName(UserInfo userInfo) {
        String name = String.join(" ",
                Objects.toString(userInfo.getLastName(), ""),
                Objects.toString(userInfo.getFirstName(), "")
        ).trim();
        return name.isEmpty() ? userInfo.getPhone() : name;
    }

    private String buildConversationId(String firstUserId, String secondUserId) {
        return firstUserId.compareTo(secondUserId) < 0
                ? firstUserId + "_" + secondUserId
                : secondUserId + "_" + firstUserId;
    }
}
