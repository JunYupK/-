package com.ssafy.matdongsan.domain.comparison.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ComparisonSaveDto {
    private Integer comparedAccountId;
    private Integer isHidden;
}
