package com.ssafy.matdongsan.domain.restaurant.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RegionIdResponseDto {
    private Short regionId;

    public RegionIdResponseDto(Short regionId) {
        this.regionId = regionId;
    }
}
