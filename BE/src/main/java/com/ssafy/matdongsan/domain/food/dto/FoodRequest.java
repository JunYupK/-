package com.ssafy.matdongsan.domain.food.dto;

import com.ssafy.matdongsan.domain.food.model.Food;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FoodRequest {

    private String name;
    private String image;

    public Food toEntity() {
        return Food.builder()
                .name(name)
                .image(image)
                .build();
    }
}
