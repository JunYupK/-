package com.ssafy.matdongsan.domain.restaurant.dto;

import com.ssafy.matdongsan.domain.naver.dto.NaverSearchSaveRequestDto;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantSaveRequestDto extends NaverSearchSaveRequestDto {

    private String name;
    private Integer mapx;
    private Integer mapy;
    private String address;
    private String roadAddress;
    private String phone;



    @Override
    public String toString() {
        return "RestaurantSaveRequestDto{" +
                "name='" + name + '\'' +
                ", mapx=" + mapx +
                ", mapy=" + mapy +
                ", address='" + address + '\'' +
                ", roadAddress='" + roadAddress + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }

    public Restaurant toEntity(Region region) {
        return Restaurant.builder()
                .region(region)
                .name(name)
                .mapx(mapx)
                .mapy(mapy)
                .address(address)
                .roadAddress(roadAddress)
                .phone(phone)
                .build();
    }
}
