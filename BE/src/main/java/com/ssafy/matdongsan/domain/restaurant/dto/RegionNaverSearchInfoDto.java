package com.ssafy.matdongsan.domain.restaurant.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RegionNaverSearchInfoDto {

    private String regionCity;
    private String regionCounty;
    private String regionDistrict;
    private String regionCode;
    private Integer regionMapx;
    private Integer regionMapy;

}
