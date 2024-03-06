package com.ssafy.matdongsan.domain.restaurant.dto;

import jakarta.persistence.Column;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class RegionIdRequestDto {
    private String city;
    private String county;
    private String district;

}
