package com.ssafy.matdongsan.domain.review.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter

@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountSaveReviewRequestDto {
    private Integer id;
    private String nickname;
    private String picture;

    @Builder
    public AccountSaveReviewRequestDto(Integer id,String nickname,String picture) {
        this.id = id;
        this.nickname = nickname;
        this.picture = picture;
    }

}
