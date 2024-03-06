package com.ssafy.matdongsan.domain.restaurant.dto;

import com.ssafy.matdongsan.domain.food.dto.FoodCategoryNaverSearchResponseDto;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantFindAllAccountResponseV2Dto {
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


}
