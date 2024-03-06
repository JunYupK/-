package com.ssafy.matdongsan.domain.restaurant.dto;

import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantFindAllResponseDto {

    private Integer id;
    private Short regionId;
    private String name;
    private Integer mapx;
    private Integer mapy;
    private String address;
    private String roadAddress;
    private String phone;

    public RestaurantFindAllResponseDto(Integer id, Short regionId, String name, Integer mapx, Integer mapy, String address, String roadAddress, String phone) {
        this.id = id;
        this.regionId = regionId;
        this.name = name;
        this.mapx = mapx;
        this.mapy = mapy;
        this.address = address;
        this.roadAddress = roadAddress;
        this.phone = phone;
    }
}
