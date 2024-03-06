package com.ssafy.matdongsan.domain.comparison.dto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ComparisonStatisticsResponseDto {
    private Integer spicyLevel;
    private List<String> bannedFoodList;

    @Builder
    public ComparisonStatisticsResponseDto(Integer spicyLevel, List<String> bannedFoodList) {
        this.spicyLevel = spicyLevel;
        this.bannedFoodList = bannedFoodList;
    }
}
