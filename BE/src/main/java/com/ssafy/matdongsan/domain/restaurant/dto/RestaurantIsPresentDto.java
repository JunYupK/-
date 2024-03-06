package com.ssafy.matdongsan.domain.restaurant.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantIsPresentDto {
    private Integer isPresent;

    public RestaurantIsPresentDto(Integer isPresent) {
        this.isPresent = isPresent;
    }
}
