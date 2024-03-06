package com.ssafy.matdongsan.domain.comparison.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ComparisonGetDto {
    private Integer comparedAccountId;
    private Integer isHidden;

    @Builder
    public ComparisonGetDto(Integer comparedAccountId, Integer isHidden) {
        this.comparedAccountId = comparedAccountId;
        this.isHidden = isHidden;
    }
}
