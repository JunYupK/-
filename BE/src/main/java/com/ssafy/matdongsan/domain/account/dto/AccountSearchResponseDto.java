package com.ssafy.matdongsan.domain.account.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountSearchResponseDto {
    private Integer id;
    private String nickname;
    private String picture;
    private int follower;

    public AccountSearchResponseDto(Integer id, String nickname, String picture, int follower) {
        this.id = id;
        this.nickname = nickname;
        this.picture = picture;
        this.follower = follower;
    }
}
