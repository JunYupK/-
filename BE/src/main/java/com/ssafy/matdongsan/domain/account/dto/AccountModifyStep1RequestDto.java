package com.ssafy.matdongsan.domain.account.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AccountModifyStep1RequestDto {
    char gender;
    short birthYear;
    Short regionId;
//    List<String> regionNames;
}