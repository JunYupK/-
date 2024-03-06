package com.ssafy.matdongsan.domain.restaurant.dto;

import com.ssafy.matdongsan.domain.review.dto.RestaurantFoodCategorySearchFilterRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class RestaurantSearchFilterRequestDto {
    private Integer isDescend;
    private List<RestaurantFoodCategorySearchFilterRequestDto> restaurantFoodCategories;
    private Short regionId;
}
