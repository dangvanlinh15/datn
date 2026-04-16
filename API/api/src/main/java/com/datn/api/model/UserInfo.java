package com.datn.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("userInfo")
@AllArgsConstructor
@Getter
@Setter

public class UserInfo {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String citizenIdentification;
    private String location;

    public UserInfo() {}
}
