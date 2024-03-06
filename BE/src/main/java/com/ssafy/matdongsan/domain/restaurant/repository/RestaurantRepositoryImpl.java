package com.ssafy.matdongsan.domain.restaurant.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantFilterDto;
import com.ssafy.matdongsan.domain.restaurant.model.QRestaurant;
import com.ssafy.matdongsan.domain.restaurant.repository.query.QSearchRestaurantQueryDto;
import com.ssafy.matdongsan.domain.restaurant.repository.query.SearchRestaurantQueryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.matdongsan.domain.restaurant.model.QRestaurant.restaurant;
import static com.ssafy.matdongsan.domain.review.model.QReview.review;

@Repository
@RequiredArgsConstructor
public class RestaurantRepositoryImpl implements RestaurantRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<SearchRestaurantQueryDto> findByFilter(RestaurantFilterDto filter) {
//        return  null;
        return jpaQueryFactory
                .select(new QSearchRestaurantQueryDto(
                        restaurant.id,
                        review.tasteRating.avg(),
                        restaurant.region.id,
                        restaurant.name,
                        restaurant.mapx,
                        restaurant.mapy,
                        restaurant.address,
                        restaurant.roadAddress,
                        restaurant.phone,
                        restaurant.thumUrl,
                        restaurant.menuInfo
                ))
                .from(restaurant)
                .leftJoin(review).on(review.restaurant.id.eq(restaurant.id))
                .where(
                        regionIdEq(filter.getRegionId()),
                        restaurantFoodCategoriesIn(filter.getRestaurantFoodCategories()) )
                .groupBy(restaurant.id)
                .orderBy(order(filter.getIsDescend()))
                .fetch();

    }

    private OrderSpecifier<?> order(Integer isDescend) {
        return isDescend==1 ? review.tasteRating.avg().desc():review.tasteRating.avg().asc();
    }

    private BooleanExpression regionIdEq(Short regionId){
        return regionId != null ? restaurant.region.id.eq(regionId):null;
    }
    private BooleanExpression restaurantFoodCategoriesIn(List<Integer> restaurantFoodCategories){
        return !restaurantFoodCategories.isEmpty() ? restaurant.restaurantFoodCategories.any().id.in(restaurantFoodCategories):null;
    }

}
