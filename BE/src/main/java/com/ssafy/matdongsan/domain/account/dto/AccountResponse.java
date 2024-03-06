package com.ssafy.matdongsan.domain.account.dto;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.food.dto.FoodCategoryResponse;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.restaurant.dto.RegionFindAllDto;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {

    private Integer id;
    private String nickname;
    private String email;
    private short birthYear;
    private byte spicyLevel;
    private int follower;
    private char gender;
    private boolean isPassed;
    private String picture;
    private List<FoodCategoryResponse> bannedFoodCategories;
    private List<RegionFindAllDto> regions;

    public static AccountResponse from(Account account) {
        List<FoodCategory> foodCategories = account.getBannedFoodCategories();
        List<FoodCategoryResponse> foodCategoryResponses = new ArrayList<>();
        for(FoodCategory foodCategory : foodCategories) {
            FoodCategoryResponse response = FoodCategoryResponse.from(foodCategory);
            foodCategoryResponses.add(response);
        }

        List<Region> regions = account.getRegions();
        List<RegionFindAllDto> regionsDtos = new ArrayList<>();
        for(Region region : regions) {
            RegionFindAllDto regionDto = RegionFindAllDto.from(region);
            regionsDtos.add(regionDto);
        }


        return AccountResponse.builder()
                .id(account.getId())
                .nickname(account.getNickname())
                .email(account.getEmail())
                .birthYear(account.getBirthYear())
                .spicyLevel(account.getSpicyLevel())
                .follower(account.getFollower())
                .gender(account.getGender())
                .isPassed(account.isPassed())
                .picture(account.getPicture())
                .bannedFoodCategories(foodCategoryResponses)
                .regions(regionsDtos)
                .build();
    }
}