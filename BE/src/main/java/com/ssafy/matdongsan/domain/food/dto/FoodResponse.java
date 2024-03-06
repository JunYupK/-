package com.ssafy.matdongsan.domain.food.dto;

import com.ssafy.matdongsan.domain.food.model.Food;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FoodResponse {

    private Integer id;
    private String name;
    private String image;

    public static FoodResponse from(Food food) {
        return FoodResponse.builder()
                .id(food.getId())
                .name(food.getName())
                .image(food.getImage())
                .build();
    }
}
