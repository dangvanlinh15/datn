package com.datn.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class ChatMessageDto {
    @Getter
    @Setter
    public static class RequestDto {
        private String senderId;
        private String senderName;
        private String recipientId;
        private String recipientName;
        private String content;
    }

    @Getter
    @Setter
    public static class ResponseDto {
        private String id;
        private String conversationId;
        private String senderId;
        private String senderName;
        private String recipientId;
        private String recipientName;
        private String content;
        private LocalDateTime createdAt;
    }
}
