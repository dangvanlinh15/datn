package com.datn.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserInfoDto {
    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  ResponseDto {

        @JsonProperty("id")
        private String id;
        private String firstName;
        private String lastName;
        private String phone;
        private String email;
        private String citizenIdentification;
        private String location;
    }

    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  RequestDto {

        @JsonProperty("id")
        private String id;
        private String firstName;
        private String lastName;
        private String phone;
        private String email;
        private String citizenIdentification;
        private String location;
    }
}
