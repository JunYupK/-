package com.ssafy.matdongsan.domain.restaurant.repository.query;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class SearchRestaurantQueryDto {
    private Integer id;
    private Double averageRating;
    private Short regionId;
    private String name;
    private Integer mapx;
    private Integer mapy;
    private String address;
    private String roadAddress;
    private String phone;
    private String thumUrl;
    private String menuInfo;


    @QueryProjection
    public SearchRestaurantQueryDto(Integer id, Double averageRating, Short regionId, String name, Integer mapx, Integer mapy, String address, String roadAddress, String phone, String thumUrl, String menuInfo) {
        this.id = id;
        this.averageRating = averageRating;
        this.regionId = regionId;
        this.name = name;
        this.mapx = mapx;
        this.mapy = mapy;
        this.address = address;
        this.roadAddress = roadAddress;
        this.phone = phone;
        this.thumUrl = thumUrl;
        this.menuInfo = menuInfo;

    }
}
