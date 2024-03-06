package com.ssafy.matdongsan.domain.account.dto;

import com.ssafy.matdongsan.domain.account.model.PersonTag;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PersonTagResponse {

    private Integer id;
    private String name;
    private short birthYear;

    public static PersonTagResponse from(PersonTag personTag) {
        return PersonTagResponse.builder()
                .id(personTag.getId())
                .name(personTag.getName())
                .birthYear(personTag.getBirthYear())
                .build();
    }
}
