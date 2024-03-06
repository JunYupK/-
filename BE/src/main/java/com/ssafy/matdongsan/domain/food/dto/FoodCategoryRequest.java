package com.ssafy.matdongsan.domain.food.dto;

import com.ssafy.matdongsan.domain.food.model.Food;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FoodCategoryRequest {

    private String name;

    public FoodCategory toEntity() {
        return FoodCategory.builder()
                .name(name)
                .build();
    }
}
