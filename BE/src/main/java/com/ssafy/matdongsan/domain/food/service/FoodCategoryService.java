package com.ssafy.matdongsan.domain.food.service;

import com.ssafy.matdongsan.domain.food.dto.FoodCategoryRequest;
import com.ssafy.matdongsan.domain.food.dto.FoodCategoryResponse;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.food.repository.FoodCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FoodCategoryService {

    private final FoodCategoryRepository foodCategoryRepository;

    public FoodCategoryResponse getFoodCategory(Integer foodId) {
        FoodCategory foodCategory = foodCategoryRepository.findById(foodId).orElseThrow();
        return FoodCategoryResponse.from(foodCategory);
    }

    public FoodCategoryResponse getFoodCategory(String foodCategoryName) {
        FoodCategory foodCategory = foodCategoryRepository.findOneByName(foodCategoryName);
        return FoodCategoryResponse.from(foodCategory);
    }

    public FoodCategoryResponse saveFoodCategory(FoodCategoryRequest request) {
        FoodCategory foodCategory = foodCategoryRepository.save(request.toEntity());
        return FoodCategoryResponse.from(foodCategory);
    }
}

