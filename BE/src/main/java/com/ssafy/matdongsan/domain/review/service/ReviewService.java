package com.ssafy.matdongsan.domain.review.service;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.account.repository.AccountRepository;
import com.ssafy.matdongsan.domain.account.repository.PersonTagRepository;
import com.ssafy.matdongsan.domain.food.dto.FoodCategoryNaverSearchResponseDto;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.food.repository.FoodCategoryRepository;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantFindAllAccountResponseV2Dto;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.restaurant.repository.RestaurantRepository;

import com.ssafy.matdongsan.domain.review.dto.*;

import com.ssafy.matdongsan.domain.review.model.Review;
import com.ssafy.matdongsan.domain.review.repository.ReviewRepository;
import com.ssafy.matdongsan.domain.review.repository.query.SearchReviewQueryDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final RestaurantRepository restaurantRepository;
    private final AccountRepository accountRepository;
    private final PersonTagRepository personTagRepository;
    private final FoodCategoryRepository foodCategoryRepository;


    //파일 업로드 연결 필요
    @Transactional
    public void save(ReviewSaveRequestDto requestDto, Integer accountId) {
        System.out.println(requestDto.toString());

        // 문자열 -> LocalDateTime
        LocalDateTime visitDate = stringToLocalDateTime(requestDto.getVisitDate());

        //예외 발생시키기 수정 필요
        System.out.println("!!!!!!!"+requestDto.getRestaurantId());
        Restaurant restaurant = restaurantRepository.findById(requestDto.getRestaurantId()).orElseThrow();

        //예외 발생시키기 수정 필요
        Account myAccount = accountRepository.findById(accountId).orElseThrow();

        List<PersonTagSaveReviewRequestDto> reviewPersonTags = requestDto.getReviewPersonTags();
        List<AccountSaveReviewRequestDto> accountReviews = requestDto.getAccountReviews();

        FriendsLists friendsLists = extractedFriends(reviewPersonTags, myAccount, accountReviews);

        Review newReview = requestDto.toEntity(myAccount ,restaurant,visitDate, friendsLists.newRivewPersonTags, friendsLists.newAccountReviews);
        reviewRepository.save(newReview);

    }


    private LocalDateTime stringToLocalDateTime(String visitDate) {
//        if (visitDate == null) {
//            // Handle the case where text is null, perhaps throw an exception or return a default value
//            throw new IllegalArgumentException("Input text is null");
//        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDateTime.of(LocalDate.parse(visitDate,formatter), LocalTime.of(0,0));
//        return LocalDateTime.of(LocalDate.of(2000, 1, 1), LocalTime.of(0,0));
    }



    @Transactional
    public PersonTag extractedPersonTag(PersonTagSaveReviewRequestDto pd, Account account) {
        //PersonTag 리스트 내 등록되지 않은 Tag있다면 등록 ,casecade안쓴 이유는 accountId 등록안되서
        Optional<PersonTag> optionalPersonTag  = personTagRepository.findByAccountAndBirthYearAndName(account, pd.getBirthYear(), pd.getName());
        //왜 orElse가 안되는지 모르겠음
        //없다면 저장 - concate하면 연계된게 많아서 나중에 안될거 같아서 일일이 저장

        return optionalPersonTag.orElseGet(() -> personTagRepository.save(pd.toEntity(account)));
    }


    public List<ReviewFindAllResponseDto> findAllByAccount(Integer accountId) {
        Account myAccount = accountRepository.findById(accountId).orElseThrow();
        List<Review> reviews = reviewRepository.findAllByAccount(myAccount);

        return reviews.stream()
                .map(review -> new ReviewFindAllResponseDto(
                        review.getId(),
                        review.getKindnessRating(),
                        review.getTasteRating(),
                        review.getContent(),
                        review.getVisitDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                        review.getRestaurant().getId(),
                        changeToAccountDtoList(review.getAccountReviews()),
                        changeToPersonTagDtoList(review.getReviewPersonTags())
                        ))
                .toList();
    }

    private List<PersonTagSaveReviewRequestDto> changeToPersonTagDtoList(List<PersonTag> reviewPersonTags) {
        return  reviewPersonTags.stream()
                .map(r -> new PersonTagSaveReviewRequestDto(
                        r.getId(),
                        r.getName(),
                        r.getBirthYear()
                ))
                .toList();

    }

    private List<AccountSaveReviewRequestDto> changeToAccountDtoList(List<Account> accountReviews) {

        return  accountReviews.stream()
                .map(a -> new AccountSaveReviewRequestDto(
                        a.getId(),
                        a.getNickname(),
                        a.getPicture()

                ))
                .toList();
    }

    public ReviewFindOneResponseDto findById(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow();
        return new ReviewFindOneResponseDto(
                review.getId(),
                review.getKindnessRating(),
                review.getTasteRating(),
                review.getContent(),
                review.getVisitDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                review.getRestaurant().getId(),
                changeToAccountDtoList(review.getAccountReviews()),
                changeToPersonTagDtoList(review.getReviewPersonTags())
        );
    }

    @Transactional
    public void delete(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    @Transactional
    public void update(Integer accountId, Long reviewId, ReviewUpdateRequestDto requestDto) {
        Review review = reviewRepository.findById(reviewId).orElseThrow();
        //예외 발생시키기 수정 필요
        Account myAccount = accountRepository.findById(accountId).orElseThrow();
        // 문자열 -> LocalDateTime
        LocalDateTime visitDate = stringToLocalDateTime(requestDto.getVisitDate());

        List<PersonTagSaveReviewRequestDto> reviewPersonTags = requestDto.getReviewPersonTags();
        List<AccountSaveReviewRequestDto> accountReviews = requestDto.getAccountReviews();

        FriendsLists friendsLists = extractedFriends(reviewPersonTags, myAccount, accountReviews);

        review.update(requestDto.getKindnessRating(),requestDto.getTasteRating(),requestDto.getContent(),visitDate,friendsLists.newAccountReviews,friendsLists.newRivewPersonTags);

    }

    private FriendsLists extractedFriends(List<PersonTagSaveReviewRequestDto> reviewPersonTags, Account myAccount, List<AccountSaveReviewRequestDto> accountReviews) {
        //태그된 친구 목록이 있을때: PersonTagSaveReviewRequestDto -> PersonTag
        List<PersonTag> newRivewPersonTags = new ArrayList<>();
        if(!reviewPersonTags.isEmpty()){
            for(PersonTagSaveReviewRequestDto pd: reviewPersonTags){
                PersonTag personTag = extractedPersonTag(pd, myAccount); //없다면 등록
                newRivewPersonTags.add(personTag);
            }
        }
        //계정이 있는 친구 목록이 있을때: AccountSaveReviewRequestDto -> Account
        List<Account> newAccountReviews = new ArrayList<>();
        if(!accountReviews.isEmpty()){
            for(AccountSaveReviewRequestDto acc: accountReviews){
                Account findedAccount = accountRepository.findById(acc.getId()).get();
                newAccountReviews.add(findedAccount);
            }
        }
        return new FriendsLists(newRivewPersonTags,newAccountReviews);

    }

    public List<ReviewSearchFilterResponseDto> searchByFilter(ReviewSearchFilterRequestDto requestDto, Integer accountId) {
        ReviewFilterDto filter = changeToFilter(requestDto,accountId);
//        FilterDto{accountId=1, accountReviews=[3, 4], reviewPersonTags=[2, 14], restaurantFoodCategories=[215, 149], startDate='2024-02-01T00:00', endDate='2024-02-03T00:00'}
        List<SearchReviewQueryDto> searchReviewQueryDtos = reviewRepository.searchByFilter(filter);
        System.out.println(filter);
        System.out.println(searchReviewQueryDtos);

        return searchReviewQueryDtos.stream().map(
                searchReviewQueryDto -> {
                    Review review = reviewRepository.findById(searchReviewQueryDto.getId()).get();
                    return new ReviewSearchFilterResponseDto(
                            searchReviewQueryDto,
                            changeToAccountDtoList(review.getAccountReviews()),
                            changeToPersonTagDtoList(review.getReviewPersonTags())
                    );
                }
        ).toList();
    }

    private ReviewFilterDto changeToFilter(ReviewSearchFilterRequestDto requestDto, Integer accountId) {
        List<Integer> restaurantFoodCategories = getRestaurantFoodCategoryIds( requestDto.getRestaurantFoodCategories());
        String dateRange = requestDto.getVisitDate();
        LocalDateTime startDate = null;
        LocalDateTime endDate = null;
        if(!dateRange.isEmpty()){
            startDate = stringToLocalDateTime(dateRange.substring(0, 10)); // Extracts "2024-02-06"
            endDate = stringToLocalDateTime(dateRange.substring(11, 21)); // Extracts "2024-02-12"

        }


        return new ReviewFilterDto(
                accountId,
                requestDto.getAccountReviews().stream().map(
                        AccountSearchFilterRequestDto::getId
                ).toList(),
                requestDto.getReviewPersonTags().stream().map(
                        PersonTagSearchFilterRequestDto::getId
                ).toList(),
                restaurantFoodCategories,
                requestDto.getRegionId(),
                startDate,
                endDate
                );
    }


    public List<Integer> getRestaurantFoodCategoryIds(List<RestaurantFoodCategorySearchFilterRequestDto> foodCategoryNames) {
        List<Integer> restaurantFoodCategories = new ArrayList<>();
        for ( RestaurantFoodCategorySearchFilterRequestDto category: foodCategoryNames){
            List<Integer> foodCategoryIds = foodCategoryRepository.findByNameLike(category.getName()).stream().map(
                    FoodCategory::getId
            ).toList();
            restaurantFoodCategories.addAll(foodCategoryIds);
        }
        return restaurantFoodCategories;
    }


    public List<RestaurantFindAllAccountResponseV2Dto> searchByRestaurantName(ReviewSearchSimpleRequestDto requestDto, Integer accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        List<Restaurant> restaurants = reviewRepository.searchByRestaurantName(requestDto.getName(), account);



        return restaurants.stream()
                .map(restaurant -> new RestaurantFindAllAccountResponseV2Dto(
                        restaurant.getId(),
                        restaurant.getRegion().getId(),
                        restaurant.getName(),
                        restaurant.getMapx(),
                        restaurant.getMapy(),
                        restaurant.getAddress(),
                        restaurant.getRoadAddress(),
                        restaurant.getPhone(),
                        restaurant.getThumUrl(),
                        restaurant.getMenuInfo(),
                        restaurant.getRestaurantFoodCategories().stream().map(
                                foodCategory -> new FoodCategoryNaverSearchResponseDto(foodCategory.getName())
                        ).toList()
                )).toList();

    }


    class FriendsLists {
        private List<PersonTag> newRivewPersonTags;
        private List<Account> newAccountReviews;


        public FriendsLists(List<PersonTag> newRivewPersonTags, List<Account> newAccountReviews) {
            this.newRivewPersonTags = newRivewPersonTags;
            this.newAccountReviews = newAccountReviews;
        }




    }
}
