package com.ssafy.matdongsan.domain.restaurant.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantSaveResponseDto {
    private Integer id;



    public RestaurantSaveResponseDto(Integer id) {
        this.id = id;
    }

}
