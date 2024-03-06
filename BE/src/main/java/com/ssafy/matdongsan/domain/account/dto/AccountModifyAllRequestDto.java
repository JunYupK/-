package com.ssafy.matdongsan.domain.account.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AccountModifyAllRequestDto {
    String nickname;
    short birthYear;
    byte spicyLevel;
    String picture;
    List<Integer> bannedFoodCategoryIds;
}
