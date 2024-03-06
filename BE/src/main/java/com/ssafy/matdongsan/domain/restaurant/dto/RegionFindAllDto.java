package com.ssafy.matdongsan.domain.restaurant.dto;

import com.ssafy.matdongsan.domain.restaurant.model.Region;
import jakarta.persistence.Column;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RegionFindAllDto {
    private Short id;
    private String code;
    private String city;
    private String county;
    private String district;
    private Integer mapx;
    private Integer mapy;

    public RegionFindAllDto(Short id, String code, String city, String county, String district, Integer mapx, Integer mapy) {
        this.id = id;
        this.code = code;
        this.city = city;
        this.county = county;
        this.district = district;
        this.mapx = mapx;
        this.mapy = mapy;
    }

    public static RegionFindAllDto from(Region region) {
        return RegionFindAllDto.builder()
                .id(region.getId())
                .code(region.getCode())
                .city(region.getCity())
                .county(region.getCounty())
                .district(region.getDistrict())
                .mapx(region.getMapx())
                .mapy(region.getMapy())
                .build();
    }
}