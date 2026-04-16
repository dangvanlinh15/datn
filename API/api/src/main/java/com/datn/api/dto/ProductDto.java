package com.datn.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

@lombok.Getter
@lombok.Setter
@lombok.ToString
public class ProductDto {
    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  ResponseDto {
        @JsonProperty("id")
        private String id;
        @JsonProperty("name")
        private String name;
        @JsonProperty("description")
        private String description;
    }

    @lombok.Getter
    @lombok.Setter
    @lombok.ToString
    public  static class  RequestDto {
        @JsonProperty("id")
        private String id;
        @JsonProperty("name")
        private String name;
        @JsonProperty("description")
        private String description;
    }
}
