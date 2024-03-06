package com.ssafy.matdongsan.domain.food.dto;

import com.ssafy.matdongsan.domain.food.model.Food;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class FoodCategoryResponse {
    private Integer id;
    private String name;

    public static FoodCategoryResponse from(FoodCategory foodCategory) {
        return FoodCategoryResponse.builder()
                .id(foodCategory.getId())
                .name(foodCategory.getName())
                .build();
    }
}
