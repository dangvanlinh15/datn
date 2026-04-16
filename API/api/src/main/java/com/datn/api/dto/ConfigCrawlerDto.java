package com.datn.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

@lombok.Getter
@lombok.Setter
@lombok.ToString
public class ConfigCrawlerDto {
    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  ResponseDto {
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
    }

    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  RequestDto {
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
        private  String priceQuery;
        private  String imageUrlQuery;
        private  String addressQuery;
        private  String acreageQuery;
        private  String directionQuery;
        private  String dateQuery;
        private  String nameContactQuery;
        private  String phoneContactQuery;
        private  String bedRoomQuery;
        private  String bathRoomQuery;
    }
}
