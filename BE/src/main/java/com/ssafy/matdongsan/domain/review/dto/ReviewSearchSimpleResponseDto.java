package com.ssafy.matdongsan.domain.review.dto;

import lombok.*;

import java.util.List;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ReviewSearchSimpleResponseDto {
    private Long id;
    private double kindnessRating;
    private double tasteRating;
    private String content;
    private String visitDate;
    private Integer restaurantId;
    private List<AccountSaveReviewRequestDto> accountReviews;
    private List<PersonTagSaveReviewRequestDto> reviewPersonTags;
}
