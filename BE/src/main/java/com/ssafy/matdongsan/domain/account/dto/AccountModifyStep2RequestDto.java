package com.ssafy.matdongsan.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AccountModifyStep2RequestDto {
    byte spicyLevel;
    String picture;
    List<Integer> bannedFoodIds;
}