package com.datn.api.dto;
@lombok.Getter
@lombok.Setter
@lombok.ToString
public class SearchDto {
    private String title;
    private int limit;
    private int page;
    // filter fields
    private Double minPrice;
    private Double maxPrice;
    private Double minSquare;
    private Double maxSquare;
    private String direct;
    private String province;
}
