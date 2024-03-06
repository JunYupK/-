package com.ssafy.matdongsan.domain.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@ToString
public class RestaurantFilterDto {
    private Integer isDescend;
    private List<Integer> restaurantFoodCategories;
    private Short regionId;

}
