package com.ssafy.matdongsan.domain.review.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.matdongsan.domain.review.dto.ReviewFilterDto;
import com.ssafy.matdongsan.domain.review.repository.query.QSearchReviewQueryDto;
import com.ssafy.matdongsan.domain.review.repository.query.SearchReviewQueryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.matdongsan.domain.restaurant.model.QRestaurant.restaurant;
import static com.ssafy.matdongsan.domain.review.model.QReview.review;


@Repository
@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<SearchReviewQueryDto> searchByFilter(ReviewFilterDto filter) {
                return jpaQueryFactory
                .select(new QSearchReviewQueryDto(
                        review.id,
                        review.kindnessRating,
                        review.tasteRating,
                        review.content,
                        review.visitDate.stringValue(),
                        review.restaurant.id
                ))
                .from(review)
                .leftJoin(restaurant).on(restaurant.id.eq(review.restaurant.id))
                .where(
                        review.account.id.eq(filter.getAccountId()),
                        regionIdEq(filter.getRegionId()),
                        accountReviewsIn(filter.getAccountReviews()),
                        reviewPersonTagsIn(filter.getReviewPersonTags()),
                        restaurantFoodCategoriesIn(filter.getRestaurantFoodCategories()),
                        visitDateBetween(
                                filter.getStartDate(),
                                filter.getEndDate()
                        )
                )
                .fetch();

    }
    private BooleanExpression regionIdEq(Short regionId){
        return regionId != null ? restaurant.region.id.eq(regionId):null;
    }
    private BooleanExpression accountReviewsIn(List<Integer> accountReviews){
        return !accountReviews.isEmpty() ? review.accountReviews.any().id.in(accountReviews):null;
    }
    private BooleanExpression reviewPersonTagsIn(List<Integer> reviewPersonTags){
        return !reviewPersonTags.isEmpty() ? review.reviewPersonTags.any().id.in(reviewPersonTags):null;
    }
    private BooleanExpression restaurantFoodCategoriesIn(List<Integer> restaurantFoodCategories){
        return !restaurantFoodCategories.isEmpty() ? restaurant.restaurantFoodCategories.any().id.in(restaurantFoodCategories):null;
    }
    private BooleanExpression visitDateBetween(LocalDateTime StartDate, LocalDateTime EndDate){
        return StartDate != null ? review.visitDate.between(StartDate, EndDate):null;
    }

}
