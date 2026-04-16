package com.datn.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

@lombok.Getter
@lombok.Setter
@lombok.ToString
public class PostsDto {
    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  ResponseDto {

        @JsonProperty("id")
        private String id;
        //    0: ban 1 :thue
        private String type;
        private String userId;

        //    query
        private  String title;
        private  String description;
        private  String price;
        private  String imageUrl;
        private String url;
        private  String address;
        private  String acreage;
        private  String direction;
        private  String date;
        private  String nameContact;
        private  String phoneContact;
        private  String bedRoom;
        private  String bathRoom;
    }

    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  RequestDto {

        @JsonProperty("id")
        private String id;
        //    0: ban 1 :thue
        private String type;
        private String userId;

        //    query
        private  String title;
        private  String description;
        private  String price;
        private  String imageUrl;
        private String url;
        private  String address;
        private  String acreage;
        private  String direction;
        private  String date;
        private  String nameContact;
        private  String phoneContact;
        private  String bedRoom;
        private  String bathRoom;
    }
}
