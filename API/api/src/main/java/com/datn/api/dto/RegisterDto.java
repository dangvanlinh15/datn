package com.datn.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterDto {

    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  ResponseDto {

        @JsonProperty("id")
        private String id;


        private String email;
        private String passWord;
        private String role;

        private String firstName;
        private String lastName;
        private String phone;
        private String citizenIdentification;
        private String location;
    }

    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  RequestDto {

        @JsonProperty("id")
        private String id;

        private String email;
        private String passWord;
        private String role;

        private String firstName;
        private String lastName;
        private String phone;
        private String citizenIdentification;
        private String location;
    }
}
