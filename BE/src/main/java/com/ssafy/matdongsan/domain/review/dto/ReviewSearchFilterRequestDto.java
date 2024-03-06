package com.ssafy.matdongsan.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ReviewSearchFilterRequestDto {
    private List<AccountSearchFilterRequestDto> accountReviews;
    private List<PersonTagSearchFilterRequestDto> reviewPersonTags;
    private List<RestaurantFoodCategorySearchFilterRequestDto> restaurantFoodCategories;
    private Short regionId;
    private String visitDate;


}
