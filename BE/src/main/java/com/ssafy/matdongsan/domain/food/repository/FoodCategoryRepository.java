package com.ssafy.matdongsan.domain.food.repository;

import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FoodCategoryRepository extends JpaRepository<FoodCategory,Integer> {
    Optional<FoodCategory> findByName(String categoryData);


    @Query("SELECT f FROM FoodCategory f WHERE f.name LIKE %:name ")
    List<FoodCategory> findByNameLike(String name);

    FoodCategory findOneByName(String name);

}
