package com.ssafy.matdongsan.domain.comparison.service;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.repository.AccountRepository;
import com.ssafy.matdongsan.domain.comparison.dto.*;
import com.ssafy.matdongsan.domain.comparison.model.Comparison;
import com.ssafy.matdongsan.domain.comparison.repository.ComparisonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ComparisonService {
    private final AccountRepository accountRepository;
    private final ComparisonRepository comparisonRepository;

    public ComparisonStatisticsResponseDto createStatistics(ComparisonStatisticsRequestDto requestDto) {
        List<Integer> comparedAccountIds = requestDto.getComparedAccountIds();

        Integer spicyLevelSum = 3;
        List<String> allBannedFoods = new ArrayList<>();
        for(Integer accountId: comparedAccountIds){
            Account account = accountRepository.findById(accountId).orElseThrow();
            byte spicyLevel = account.getSpicyLevel();

            spicyLevelSum = Math.min(spicyLevelSum,spicyLevel);

            List<String> bannedFoods = account.getBannedFoodCategories().stream().map(
                   foodCategory -> foodCategory.getName()
            ).toList();
            allBannedFoods.addAll(bannedFoods);
        }
        Integer averageSpicyLevel = spicyLevelSum;

        allBannedFoods = allBannedFoods.stream().distinct().toList();

        return new ComparisonStatisticsResponseDto(averageSpicyLevel,allBannedFoods);


    }

    @Transactional
    public void save(Integer accountId, ComparisonSaveRequestDto requestDto) {

        Account myAccount = accountRepository.findById(accountId).orElseThrow();
        //이전에 저장된 값 초기화
        comparisonRepository.deleteAllByAccountId(myAccount);
        //새로 저장
        List<ComparisonSaveDto> comparisonList = requestDto.getComparisonList();
        for (ComparisonSaveDto c : comparisonList){
            Account comparedAccount = accountRepository.findById(c.getComparedAccountId()).orElseThrow();
            boolean isHidden = c.getIsHidden() != 0;
            Comparison comparison = new Comparison(myAccount, comparedAccount, isHidden);
            comparisonRepository.save(comparison);
        }
    }

    public ComparisonGetResponseDto get(Integer accountId) {
        Account myAccount = accountRepository.findById(accountId).orElseThrow();
        List<Comparison> allByComparer = comparisonRepository.findAllByComparer(myAccount);
        List<ComparisonGetDto> comparisonList = allByComparer.stream().map(
                comparison -> new ComparisonGetDto(
                        comparison.getCompared().getId(),
                        comparison.isHidden() ? 1:0 //Boolean to Integer
                )
        ).toList();
        return new ComparisonGetResponseDto(comparisonList);

    }
}
