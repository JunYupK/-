package com.ssafy.matdongsan.domain.account.service;

import com.ssafy.matdongsan.domain.account.dto.*;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.account.repository.AccountRepository;
import com.ssafy.matdongsan.domain.account.repository.PersonTagRepository;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.food.repository.FoodCategoryRepository;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountService {

    private final AccountRepository accountRepository;
    private final PersonTagRepository personTagRepository;
    private final RegionRepository regionRepository;
    private final FoodCategoryRepository foodCategoryRepository;

    public PersonTagResponse savePersonTag(PersonTagSaveRequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        PersonTag personTag = dto.toEntity();
        account.setPersonTag(personTag);
        accountRepository.save(account);
        PersonTag savedPersonTag = personTagRepository.save(personTag);
        return PersonTagResponse.from(savedPersonTag);
    }

    public AccountResponse modifyAccount(AccountModifyAllRequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        account.setAccountInfos(dto);
        account.clearBannedFoodCategories();
        List<Integer> ids = dto.getBannedFoodCategoryIds();
        if (!ids.isEmpty()) {
            for (Integer id : ids) {
                FoodCategory foodCategory = foodCategoryRepository.findById(id).orElseThrow();
                account.addBannedFoodCategory(foodCategory);
            }
        }
        Account savedAccount = accountRepository.save(account);
        return AccountResponse.from(savedAccount);
    }

    public AccountResponse modifyAccount(AccountModifyStep1RequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        Region region = regionRepository.findById(dto.getRegionId()).orElseThrow();
        account.setGenderAndBirthYear(dto.getGender(), dto.getBirthYear());
        account.clearRegions();
        account.addRegion(region);
        Account savedAccount = accountRepository.save(account);
        return AccountResponse.from(savedAccount);
    }

    public AccountResponse modifyAccount(AccountModifyStep2RequestDto dto, String email) {
        Account account = accountRepository.findByEmail(email);
        account.setSpicyLevel(dto.getSpicyLevel());
        if (!"".equals(dto.getPicture())) {
            account.setPicture(dto.getPicture());
        }
        account.clearBannedFoodCategories();
        for (Integer id : dto.getBannedFoodIds()) {
            FoodCategory foodCategory = foodCategoryRepository.findById(id).orElseThrow();
            account.addBannedFoodCategory(foodCategory);
        }
        account.pass();
        Account savedAccount = accountRepository.save(account);
        return AccountResponse.from(savedAccount);
    }

    public AccountResponse saveAccount(AccountSaveRequestDto dto) {
        Account account = accountRepository.save(dto.toEntity());
        return AccountResponse.from(account);
    }

    public AccountResponse getAccount(Integer accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        return AccountResponse.from(account);
    }

    public AccountResponse getAccount(String email) {
        Account account = accountRepository.findByEmail(email);
        return AccountResponse.from(account);
    }

    public List<PersonTagResponse> getPersonTags(String email) {
        Account account = accountRepository.findByEmail(email);
        List<PersonTag> personTags;
        personTags = account.getPersonTags();
        List<PersonTagResponse> ret = new ArrayList<>();
        for (PersonTag personTag : personTags) {
            ret.add(PersonTagResponse.from(personTag));
        }
        return ret;
    }

    public List<AccountSimpleResponseDto> getAccountsTop10() {
        List<AccountSimpleResponseDto> ret = new ArrayList<>();
        List<Account> accounts = accountRepository.findAllOrderByFollower();
        for (Account account : accounts) {
            AccountSimpleResponseDto dto = AccountSimpleResponseDto.builder()
                    .id(account.getId())
                    .picture(account.getPicture())
                    .nickname(account.getNickname())
                    .follower(account.getFollower())
                    .build();
            ret.add(dto);
            if (ret.size() == 10)
                break;
        }
        return ret;
    }

    public List<AccountSearchResponseDto> searchNickname(String query) {
        List<Account> accounts = accountRepository.findAllByNickname(query);

        return accounts.stream().map(
                account -> new AccountSearchResponseDto(
                        account.getId(),
                        account.getNickname(),
                        account.getPicture(),
                        account.getFollower()
                )
        ).toList();

    }

    public void deleteAccount(Integer accountId) {
        accountRepository.deleteById(accountId);
    }

    public List<PersonTagResponse> getPersonTagsById(Integer accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        List<PersonTag> personTags = account.getPersonTags();
        List<PersonTagResponse> ret = new ArrayList<>();
        for (PersonTag personTag : personTags) {
            ret.add(PersonTagResponse.from(personTag));
        }
        return ret;
    }
}