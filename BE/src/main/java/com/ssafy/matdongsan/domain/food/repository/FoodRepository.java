package com.ssafy.matdongsan.domain.food.repository;

import com.ssafy.matdongsan.domain.food.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {

    Food findByName(String foodName);
}
