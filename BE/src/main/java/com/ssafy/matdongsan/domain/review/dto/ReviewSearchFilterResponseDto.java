package com.ssafy.matdongsan.domain.review.dto;

import com.ssafy.matdongsan.domain.review.repository.query.SearchReviewQueryDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewSearchFilterResponseDto {
    private Long id;
    private double kindnessRating;
    private double tasteRating;
    private String content;
    private String visitDate;
    private Integer restaurantId;
    private List<AccountSaveReviewRequestDto> accountReviews;
    private List<PersonTagSaveReviewRequestDto> reviewPersonTags;

    public ReviewSearchFilterResponseDto(SearchReviewQueryDto dto, List<AccountSaveReviewRequestDto> accountReviews, List<PersonTagSaveReviewRequestDto> reviewPersonTags) {
        this.id = dto.getId();
        this.kindnessRating = dto.getKindnessRating();
        this.tasteRating = dto.getTasteRating();
        this.content = dto.getContent();
        this.visitDate = dto.getVisitDate();
        this.restaurantId = dto.getRestaurantId();
        this.accountReviews = accountReviews;
        this.reviewPersonTags = reviewPersonTags;
    }
}
