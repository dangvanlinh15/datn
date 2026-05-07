package com.datn.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatConversationDto {
    private String conversationId;
    private String userId;
    private String name;
    private String phone;
    private String lastMessage;
    private LocalDateTime lastMessageAt;
}
