package com.ssafy.matdongsan.domain.subcription.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SubscriptionRequestDto {
    private int followerId;
    private int followingId;
}
