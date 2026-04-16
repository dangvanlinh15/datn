package com.datn.api.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("configCrawler")
@AllArgsConstructor
@Getter
@Setter
public class ConfigCrawler {
    @Id
    private String id;
    private String titlePage;
    private String urlPage;
    private  String namePage;
    private  boolean modeSchedule;
    private  boolean modePublic;
    private  boolean modeCookies;
    private  boolean modeRobotsParser;
    private  int timeOutCrawl;
    private  int timeRetryCrawl;
    private  int timeDelayCrawl;
    private  String cookies;
    private  String userAgent;
    private  String httpHeader;
//  Querry
    private  int numberPageQuery;
    private  String titleQuery;
    private  String urlQuery;
    private  String descriptionQuery;
    private  String imageUrlQuery;
    private  String priceQuery;
    private  String addressQuery;
    private  String acreageQuery;
    private  String directionQuery;
    private  String dateQuery;
    private  String nameContactQuery;
    private  String phoneContactQuery;
    private  String bedRoomQuery;
    private  String bathRoomQuery;


   public ConfigCrawler() {}
}
