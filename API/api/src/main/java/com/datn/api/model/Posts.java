package com.datn.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.annotation.Reference;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document("posts")
@AllArgsConstructor
@Getter
@Setter
public class Posts {

    @Id
    private String id;
//    0: ban 1 :thue

    private String type;

    private String  userId;

//    query
    private  String title;
    private  String description;
    private  String price;
    private  String square;
    private  String name_contact;
    private  String phone_contact;
    private  String date;
    private  String direct;
    private  String address;
    private  String province;
    private  String floor;
    private  String juridical;
    private  String bedroom;
    private  String length;
    private  String width;
    private  String link_image;
    private String url_page;
    private String kitchen;
    private String parking;
    private String terrace;
    public Posts(){

    }
}
