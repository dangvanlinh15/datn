package com.datn.api.repository;

import com.datn.api.model.Product;
import com.datn.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByEmail(String userName);
    List<User> findUserByRole(String role);
}