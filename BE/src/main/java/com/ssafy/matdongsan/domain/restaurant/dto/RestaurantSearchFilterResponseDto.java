package com.ssafy.matdongsan.domain.restaurant.dto;

import com.ssafy.matdongsan.domain.food.dto.FoodCategoryNaverSearchResponseDto;
import com.ssafy.matdongsan.domain.restaurant.repository.query.SearchRestaurantQueryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@ToString
public class RestaurantSearchFilterResponseDto {
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
    private List<FoodCategoryNaverSearchResponseDto> restaurantFoodCategories;

    public RestaurantSearchFilterResponseDto(SearchRestaurantQueryDto dto, List<FoodCategoryNaverSearchResponseDto> list) {
         this.id=dto.getId();
         this.averageRating=dto.getAverageRating();
         this.regionId=dto.getRegionId();
         this.name=dto.getName();
         this.mapx=dto.getMapx();
         this.mapy=dto.getMapy();
         this.address=dto.getAddress();
         this.roadAddress=dto.getRoadAddress();
         this.phone=dto.getPhone();
         this.thumUrl=dto.getThumUrl();
         this.menuInfo=dto.getMenuInfo();
         this.restaurantFoodCategories =list;



    }
}
