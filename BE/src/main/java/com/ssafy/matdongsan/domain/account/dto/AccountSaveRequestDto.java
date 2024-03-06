package com.ssafy.matdongsan.domain.account.dto;

import com.ssafy.matdongsan.domain.account.model.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AccountSaveRequestDto {
    private String username;
    private String nickname;
    private String email;
    private short birthYear;
    private byte spicyLevel;

    public Account toEntity() {
        return Account.builder()
                .username(username)
                .nickname(nickname)
                .email(email)
                .birthYear(birthYear)
                .spicyLevel(spicyLevel)
                .build();
    }
}
