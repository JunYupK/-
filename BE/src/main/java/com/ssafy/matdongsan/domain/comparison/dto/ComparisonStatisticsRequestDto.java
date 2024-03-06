package com.ssafy.matdongsan.domain.comparison.dto;

import com.ssafy.matdongsan.domain.account.model.Account;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ComparisonStatisticsRequestDto {
    private List<Integer> comparedAccountIds;
}
