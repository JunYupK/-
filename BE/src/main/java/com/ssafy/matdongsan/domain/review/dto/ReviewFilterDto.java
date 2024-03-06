package com.ssafy.matdongsan.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@ToString
public class ReviewFilterDto {
    private Integer accountId;
    private List<Integer> accountReviews;
    private List<Integer> reviewPersonTags;
    private List<Integer> restaurantFoodCategories;
    private Short regionId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;


}
