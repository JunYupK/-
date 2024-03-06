package com.ssafy.matdongsan.domain.restaurant.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantFindAllAccountResponseDto {

    private Integer id;
    private Short regionId;
    private String name;
    private Integer mapx;
    private Integer mapy;
    private String address;
    private String roadAddress;
    private String phone;

    public RestaurantFindAllAccountResponseDto(Integer id, Short regionId, String name, Integer mapx, Integer mapy, String address, String roadAddress, String phone) {
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
