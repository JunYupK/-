package com.ssafy.matdongsan.domain.restaurant.repository;

import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> ,RestaurantRepositoryCustom{
    Optional<List<Restaurant>> findByNameAndMapxAndMapy(String name, Integer mapx, Integer mapy);
}
