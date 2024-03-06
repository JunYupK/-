package com.ssafy.matdongsan.domain.account.model;

import com.ssafy.matdongsan.domain.BaseEntity;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.review.model.Review;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PersonTag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_tag_id")
    @EqualsAndHashCode.Include
    private Integer id;

    @Column(name = "person_tag_name", nullable = false, length = 100)
    private String name;

    private short birthYear;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToMany(mappedBy = "reviewPersonTags")
    private List<Review> reviews = new ArrayList<>();

    @Builder
    public PersonTag(String name, short birthYear, Account account) {
        this.name = name;
        this.birthYear = birthYear;
        this.account = account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}