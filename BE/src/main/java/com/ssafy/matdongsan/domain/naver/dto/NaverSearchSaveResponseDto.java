
package com.ssafy.matdongsan.domain.naver.dto;

import com.ssafy.matdongsan.domain.food.dto.FoodCategoryNaverSearchResponseDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NaverSearchSaveResponseDto {
    private Integer id;
    private Short regionId;
    private String name;
    private Integer mapx;
    private Integer mapy;
    private String address;
    private String roadAddress;
    private String phone;
    private String thumUrl;
    private String menuInfo;
    private List<FoodCategoryNaverSearchResponseDto> restaurantFoodCategories;


    public NaverSearchSaveResponseDto(Integer id, Short regionId, NaverSearchSaveRequestDto requestDto, List<FoodCategoryNaverSearchResponseDto> restaurantFoodCategories) {
        this.id = id;
        this.regionId = regionId;
        this.name = requestDto.getName();
        this.mapx = requestDto.getMapx();
        this.mapy = requestDto.getMapy();
        this.address = requestDto.getAddress();
        this.roadAddress = requestDto.getRoadAddress();
        this.phone = requestDto.getPhone();
        this.thumUrl = requestDto.getThumUrl();
        this.menuInfo = requestDto.getMenuInfo();
        this.restaurantFoodCategories = restaurantFoodCategories;
    }

}
