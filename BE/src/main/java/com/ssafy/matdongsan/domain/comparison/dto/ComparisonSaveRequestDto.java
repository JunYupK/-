package com.ssafy.matdongsan.domain.comparison.dto;

import com.ssafy.matdongsan.domain.comparison.model.Comparison;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ComparisonSaveRequestDto {
    private List<ComparisonSaveDto> comparisonList;
}
