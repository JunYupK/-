package com.ssafy.matdongsan.domain.comparison.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ComparisonGetResponseDto {
    private List<ComparisonGetDto> comparisonList;

    @Builder
    public ComparisonGetResponseDto(List<ComparisonGetDto> comparisonList) {
        this.comparisonList = comparisonList;
    }
}
