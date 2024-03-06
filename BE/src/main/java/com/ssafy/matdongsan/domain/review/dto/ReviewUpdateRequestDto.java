package com.ssafy.matdongsan.domain.review.dto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewUpdateRequestDto {

    private double kindnessRating;
    private double tasteRating;
    private String content;
    private String visitDate;
    private List<AccountSaveReviewRequestDto> accountReviews;
    private List<PersonTagSaveReviewRequestDto> reviewPersonTags;

}
