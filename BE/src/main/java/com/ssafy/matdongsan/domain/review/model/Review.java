package com.ssafy.matdongsan.domain.review.model;

import com.ssafy.matdongsan.domain.BaseEntity;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @Column(nullable = false)
    private double kindnessRating = 0.0F;

    @Column(nullable = false)
    private double tasteRating = 0.0F;

    private String content;
    private LocalDateTime visitDate;

    @OneToMany(mappedBy = "review")
    private List<ReviewImage> reviewImages = new ArrayList<>();

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToMany
    @JoinTable(
            name = "review_person_tag",
            joinColumns = @JoinColumn(name = "review_id"),
            inverseJoinColumns = @JoinColumn(name = "person_tag_id")

    )
    private List<PersonTag> reviewPersonTags = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "account_review",
            joinColumns = @JoinColumn(name = "review_id"),
            inverseJoinColumns = @JoinColumn(name = "account_id")
    )
    private List<Account> accountReviews = new ArrayList<>();

    @Builder
    public Review(double kindnessRating, double tasteRating, String content, LocalDateTime visitDate, Restaurant restaurant, Account account, List<PersonTag> reviewPersonTags, List<Account> accountReviews) {
        this.kindnessRating = kindnessRating;
        this.tasteRating = tasteRating;
        this.content = content;
        this.visitDate = visitDate;
        this.restaurant = restaurant;
        this.account = account;
        this.reviewPersonTags = reviewPersonTags;
        this.accountReviews = accountReviews;
    }
    

    public void update(double kindnessRating, double tasteRating, String content, LocalDateTime visitDate, List<Account> newAccountReviews, List<PersonTag> newRivewPersonTags) {
        this.kindnessRating = kindnessRating;
        this.tasteRating = tasteRating;
        this.content = content;
        this.visitDate = visitDate;
        this.accountReviews = newAccountReviews;
        this.reviewPersonTags = newRivewPersonTags;
    }
}
