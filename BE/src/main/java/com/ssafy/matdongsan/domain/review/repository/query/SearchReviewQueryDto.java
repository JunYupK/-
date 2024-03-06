package com.ssafy.matdongsan.domain.review.repository.query;


import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SearchReviewQueryDto {
    private Long id;
    private double kindnessRating;
    private double tasteRating;
    private String content;
    private String visitDate;
    private Integer restaurantId;

    @QueryProjection //생성자에 어노테이션을 달아주면, 다른 Q 엔티티와 같이 빌드 시에 생성됨
    public SearchReviewQueryDto(Long id, double kindnessRating, double tasteRating, String content, String visitDate, Integer restaurantId) {
        this.id = id;
        this.kindnessRating = kindnessRating;
        this.tasteRating = tasteRating;
        this.content = content;
        this.visitDate = visitDate;
        this.restaurantId = restaurantId;
    }
}
