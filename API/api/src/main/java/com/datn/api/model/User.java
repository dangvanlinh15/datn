package com.datn.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    private String id;
    private String email;
    private String passWord;
    private String role;

    public User(){}
}
