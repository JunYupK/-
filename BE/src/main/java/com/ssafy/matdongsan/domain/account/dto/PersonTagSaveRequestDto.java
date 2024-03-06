package com.ssafy.matdongsan.domain.account.dto;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PersonTagSaveRequestDto {
    private String name;
    private short birthYear;

    public PersonTag toEntity(Account account) {
        return PersonTag.builder()
                .name(this.name)
                .birthYear(this.birthYear)
                .account(account)
                .build();

    }

    public PersonTag toEntity() {
        return PersonTag.builder()
                .name(this.name)
                .birthYear(this.birthYear)
                .build();
    }
}
