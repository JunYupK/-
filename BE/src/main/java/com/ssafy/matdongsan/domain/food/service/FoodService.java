package com.ssafy.matdongsan.domain.food.service;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.repository.AccountRepository;
import com.ssafy.matdongsan.domain.food.dto.FoodCategoryResponse;
import com.ssafy.matdongsan.domain.food.dto.FoodRequest;
import com.ssafy.matdongsan.domain.food.dto.FoodResponse;
import com.ssafy.matdongsan.domain.food.model.Food;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.food.repository.FoodCategoryRepository;
import com.ssafy.matdongsan.domain.food.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;
    private final AccountRepository accountRepository;

    public FoodResponse getFood(Integer foodId) {
        Food food = foodRepository.findById(foodId).orElseThrow();
        return FoodResponse.from(food);
    }

    public FoodResponse getFood(String foodName) {
        Food food = foodRepository.findByName(foodName);
        return FoodResponse.from(food);
    }

    public FoodResponse saveFood(FoodRequest request) {
        Food food = foodRepository.save(request.toEntity());
        return FoodResponse.from(food);
    }

    public List<FoodCategoryResponse> getBannedFoodCategories(String email) {
        Account account = accountRepository.findByEmail(email);
        List<FoodCategory> bannedFoodCategories = account.getBannedFoodCategories();
        List<FoodCategoryResponse> ret = new ArrayList<>();
        for (FoodCategory foodCategory : bannedFoodCategories) {
            ret.add(FoodCategoryResponse.from(foodCategory));
        }
        return ret;
    }
}
