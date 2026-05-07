package com.datn.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("chatMessage")
@AllArgsConstructor
@Getter
@Setter
public class ChatMessage {
    @Id
    private String id;
    private String conversationId;
    private String senderId;
    private String senderName;
    private String recipientId;
    private String recipientName;
    private String content;
    private LocalDateTime createdAt;

    public ChatMessage() {
    }
}
