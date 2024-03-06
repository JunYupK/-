package com.ssafy.matdongsan.domain.review.dto;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import lombok.AccessLevel;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonTagSaveReviewRequestDto {
    private Integer id;
    private String name;
    private short birthYear;

    @Builder
    public PersonTagSaveReviewRequestDto(Integer id, String name, short birthYear) {
        this.id = id;
        this.name = name;
        this.birthYear = birthYear;
    }


    public PersonTag toEntity(Account account) {
        return PersonTag.builder()
                .account(account)
                .name(name)
                .birthYear(birthYear)
                .build();
    }
}
