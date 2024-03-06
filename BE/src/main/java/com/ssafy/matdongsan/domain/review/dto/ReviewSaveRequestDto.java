package com.ssafy.matdongsan.domain.review.dto;


import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.review.model.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;


import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ReviewSaveRequestDto {

    private double kindnessRating;
    private double tasteRating;
    private String content;
    private String visitDate;
    private Integer restaurantId;
    private List<AccountSaveReviewRequestDto> accountReviews;
    private List<PersonTagSaveReviewRequestDto> reviewPersonTags;

    public Review toEntity(Account account, Restaurant restaurant, LocalDateTime visitDate, List<PersonTag> reviewPersonTags, List<Account> accountReviews) {
        return Review.builder()
                .account(account)
                .kindnessRating(kindnessRating)
                .tasteRating(tasteRating)
                .content(content)
                .visitDate(visitDate)
                .restaurant(restaurant)
                .reviewPersonTags(reviewPersonTags)
                .accountReviews(accountReviews)
                .build();
    }

    @Override
    public String toString() {
        return "ReviewSaveRequestDto{" +
                "kindnessRating=" + kindnessRating +
                ", tasteRating=" + tasteRating +
                ", content='" + content + '\'' +
                ", visitDate='" + visitDate + '\'' +
                ", restaurantId=" + restaurantId +
                ", accountReviews=" + accountReviews +
                ", reviewPersonTags=" + reviewPersonTags +
                '}';
    }
}
