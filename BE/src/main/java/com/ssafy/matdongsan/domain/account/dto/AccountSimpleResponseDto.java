package com.ssafy.matdongsan.domain.account.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountSimpleResponseDto {
    private Integer id;
    private String picture;
    private String nickname;
    private int follower;
}
