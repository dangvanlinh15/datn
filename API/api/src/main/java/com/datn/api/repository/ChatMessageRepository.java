package com.datn.api.repository;

import com.datn.api.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findByConversationIdOrderByCreatedAtAsc(String conversationId);

    Optional<ChatMessage> findTopByConversationIdOrderByCreatedAtDesc(String conversationId);

    List<ChatMessage> findBySenderIdOrRecipientId(String senderId, String recipientId);
}
