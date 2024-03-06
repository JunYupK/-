package com.ssafy.matdongsan.domain.restaurant.repository;

import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantFilterDto;
import com.ssafy.matdongsan.domain.restaurant.repository.query.SearchRestaurantQueryDto;

import java.util.List;

public interface RestaurantRepositoryCustom {
    List<SearchRestaurantQueryDto> findByFilter(RestaurantFilterDto filter);
}
