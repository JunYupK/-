package com.ssafy.matdongsan.domain.naver.dto;


import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NaverSearchSaveRequestDto {

    private String name;
    private Integer mapx;
    private Integer mapy;
    private String address;
    private String roadAddress;
    private String phone;
    private String thumUrl;
    private String menuInfo;
    private List<FoodCategory> restaurantFoodCategories;
    public Restaurant toEntity(Region region) {
        return Restaurant.builder()
                .region(region)
                .name(name)
                .mapx(mapx)
                .mapy(mapy)
                .address(address)
                .roadAddress(roadAddress)
                .phone(phone)
                .thumUrl(thumUrl)
                .menuInfo(menuInfo)
                .restaurantFoodCategories(restaurantFoodCategories)
                .build();
    }
    @Override
    public String toString() {
        return "NaverSearchSaveRequestDto{" +
                "name='" + name + '\'' +
                ", mapx=" + mapx +
                ", mapy=" + mapy +
                ", address='" + address + '\'' +
                ", roadAddress='" + roadAddress + '\'' +
                ", phone='" + phone + '\'' +
                ", thumUrl='" + thumUrl + '\'' +
                ", menuInfo='" + menuInfo + '\'' +
                ", restaurantFoodCategories=" + restaurantFoodCategories +
                '}';
    }

}
