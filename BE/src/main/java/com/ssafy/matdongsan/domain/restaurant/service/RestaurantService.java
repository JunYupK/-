package com.ssafy.matdongsan.domain.restaurant.service;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.repository.AccountRepository;
import com.ssafy.matdongsan.domain.food.dto.FoodCategoryNaverSearchResponseDto;
import com.ssafy.matdongsan.domain.naver.dto.NaverSearchSaveRequestDto;
import com.ssafy.matdongsan.domain.naver.dto.NaverSearchSaveResponseDto;
import com.ssafy.matdongsan.domain.restaurant.dto.*;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.restaurant.repository.RegionRepository;
import com.ssafy.matdongsan.domain.restaurant.repository.RestaurantRepository;

import com.ssafy.matdongsan.domain.restaurant.repository.query.SearchRestaurantQueryDto;
import com.ssafy.matdongsan.domain.review.repository.ReviewRepository;
import com.ssafy.matdongsan.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor //@Autowired 사용 지양됨 -> @RequiredArgsConstructor 로 생성되는 생성자로 주입받기 위해 final 붙임.
@Transactional(readOnly = true)
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final RegionRepository regionRepository;
    private final AccountRepository accountRepository;
    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;


    @Transactional
    public RestaurantSaveResponseDto save(RestaurantSaveRequestDto requestDto) {

        Optional<List<Restaurant>> restaurants = getRestaurants(requestDto);
        //음식점이 이미 등록 되어 있는 경우
        if(!restaurants.get().isEmpty()) {
            //여러개면 첫Id -> DB중복 삭제 필요
            return new RestaurantSaveResponseDto(restaurants.get().get(0).getId());
        }
        ResponseEntity<String> responseEntity = getStringResponseEntity(requestDto);
        Region region = getRegion(responseEntity);
        Restaurant restaurant = requestDto.toEntity(region);
        return new RestaurantSaveResponseDto(restaurantRepository.save(restaurant).getId());
    }
    @Transactional
    public NaverSearchSaveResponseDto saveNaverSearchV2(NaverSearchSaveRequestDto requestDto) {
        Optional<List<Restaurant>> restaurants = getRestaurants(requestDto);
        List<FoodCategoryNaverSearchResponseDto> restaurantFoodCategories = requestDto.getRestaurantFoodCategories().stream().map(
                foodCategory -> new FoodCategoryNaverSearchResponseDto(foodCategory.getName())
        ).toList();
        //음식점이 이미 등록 되어 있는 경우
        if(!restaurants.get().isEmpty()) {
            //여러개면 첫Id -> DB중복 삭제 필요
            return new NaverSearchSaveResponseDto(restaurants.get().get(0).getId(),restaurants.get().get(0).getRegion().getId(),requestDto,restaurantFoodCategories);
        }
        ResponseEntity<String> responseEntity = getStringResponseEntity(requestDto);
        Region region = getRegion(responseEntity);

        Restaurant restaurant = requestDto.toEntity(region);
        return new NaverSearchSaveResponseDto(restaurantRepository.save(restaurant).getId(),region.getId(),requestDto,restaurantFoodCategories);
    }

    private Optional<List<Restaurant>> getRestaurants(NaverSearchSaveRequestDto requestDto) {
        Optional<List<Restaurant>> restaurants =  restaurantRepository.findByNameAndMapxAndMapy(requestDto.getName(), requestDto.getMapx(), requestDto.getMapy());
        return restaurants;
    }

    private Region getRegion(ResponseEntity<String> responseEntity) {
        //JSON 데이터 파싱
        JSONObject jObj = new JSONObject(responseEntity.getBody());
//        System.out.println(responseEntity.getBody());
//        {"status":{"code":0,"name":"ok","message":"done"},
//         "results":[{"name":"legalcode","code":{"id":"5115011200","type":"L","mappingId":"01150112"},"region":{"area0":{"name":"kr","coords":{"center":{"crs":"","x":0.0,"y":0.0}}},"area1":{"name":"강원특별자치도","coords":{"center":{"crs":"EPSG:4326","x":128.311526,"y":37.860367}},"alias":"강원"},"area2":{"name":"강릉시","coords":{"center":{"crs":"EPSG:4326","x":128.875836,"y":37.752175}}},"area3":{"name":"초당동","coords":{"center":{"crs":"EPSG:4326","x":128.915963,"y":37.791883}}},"area4":{"name":"","coords":{"center":{"crs":"","x":0.0,"y":0.0}}}}}]}

        //법정동 코드 뽑기
        JSONObject results = jObj.getJSONArray("results").getJSONObject(0);
        String code = results.getJSONObject("code").getString("id");
        code = code.substring(0,code.length()-2); //뒤에서 2자리 제거 (하위 지역)ㄴ

        //1) 코드로 찾기
        String finalCode = code;
        Region region = regionRepository.findByCode(code).orElseGet( ()->
        {
            //2) 만약 법정동 코드가 없을 경우 새로 등록
            // 시 , 시약어, 구/군, 동 뽑기
            // ex- 강원도 -> 강원특별자치도로 개편해서 코드 없음
            JSONObject regionObject = results.getJSONObject("region");
            String area1 = regionObject.getJSONObject("area1").getString("name");
            String area2 = regionObject.getJSONObject("area2").getString("name");
            String area3 = regionObject.getJSONObject("area3").getString("name");
            JSONObject coordsObject = regionObject.getJSONObject("area3").getJSONObject("coords").getJSONObject("center");
            Integer mapx = Integer.parseInt(String.format("%.7f", coordsObject.getDouble("x")).replaceAll("\\.",""));
            Integer mapy = Integer.parseInt(String.format("%.7f", coordsObject.getDouble("y")).replaceAll("\\.",""));
            System.out.println("mapx:"+mapx+"mapy:"+mapy);
            Region newRegion = new Region(finalCode, area1,area2,area3,mapx,mapy);

            //없으면 등록 및 아이디값 가져옴
            return regionRepository.save(newRegion);

        });
        return region;
    }

    private static ResponseEntity<String> getStringResponseEntity(NaverSearchSaveRequestDto requestDto) {
        //좌표 Int -> 소수로 변환
        String coords = String.format("%.7f", requestDto.getMapx() * 0.0000001) +","+  String.format("%.7f", requestDto.getMapy() * 0.0000001);

        URI uri = UriComponentsBuilder
                .fromUriString("https://naveropenapi.apigw.ntruss.com")
                .path("/map-reversegeocode/v2/gc")
                .queryParam("coords",coords )
                .queryParam("orders","legalcode")
                .queryParam("output","json")
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUri();

        //WebClient  요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://naveropenapi.apigw.ntruss.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("X-NCP-APIGW-API-KEY-ID","ntent8uz74")
                .defaultHeader("X-NCP-APIGW-API-KEY","k0eFc4F5w8d22LVGUQTVlBtsQfR6TiA5nWXfpZ4p")
                .build();


        ResponseEntity<String> responseEntity = webClient.get()
                .uri(uri)
                .retrieve()
                .toEntity(String.class)
                .block();

        return responseEntity;
    }


    public List<RestaurantFindAllResponseDto> findAll() {
        List<Restaurant> restaurants = restaurantRepository.findAll();

        return restaurants.stream()
                .map(restaurant -> new RestaurantFindAllResponseDto(
                         restaurant.getId(),
                         restaurant.getRegion().getId(),
                         restaurant.getName(),
                         restaurant.getMapx(),
                         restaurant.getMapy(),
                         restaurant.getAddress(),
                         restaurant.getRoadAddress(),
                         restaurant.getPhone()

                ))
                .toList();
    }

    public RestaurantFindOneResponseDto findById(Integer restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow();
        return new RestaurantFindOneResponseDto(
                restaurant.getId(),
                restaurant.getRegion().getId(),
                restaurant.getName(),
                restaurant.getMapx(),
                restaurant.getMapy(),
                restaurant.getAddress(),
                restaurant.getRoadAddress(),
                restaurant.getPhone()
        );
    }

    @Transactional
    public void accountSave(Integer accountId, Integer restaurantId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow();
        List<Restaurant> restaurants = account.getRestaurants();
        if(!restaurants.contains(restaurant)){ //음식점이 이미 있는지 확인하고 없다면 추가
            restaurants.add(restaurant);
            account.updateRestaurant(restaurants); //더티체킹
        }
    }


    public List<RestaurantFindAllAccountResponseDto> findAllAccountRestaurants(Integer accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        List<Restaurant> restaurants = account.getRestaurants();
        return restaurants.stream().map(
                restaurant -> new RestaurantFindAllAccountResponseDto(
                        restaurant.getId(),
                        restaurant.getRegion().getId(),
                        restaurant.getName(),
                        restaurant.getMapx(),
                        restaurant.getMapy(),
                        restaurant.getAddress(),
                        restaurant.getRoadAddress(),
                        restaurant.getPhone())
        ).toList();
    }

    @Transactional
    public void delete(Integer accountId, Integer restaurantId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow();
        List<Restaurant> restaurants = account.getRestaurants();

        //음식점이 이미 있는지 확인하고 있으면 제거
        if(restaurants.contains(restaurant)){
            restaurants.remove(restaurant);
            account.updateRestaurant(restaurants);
        }
        //리뷰 삭제
        reviewRepository.deleteByAccountAndRestaurant(account,restaurant);

    }

    public RestaurantIsPresentDto getIsPresent(Integer accountId, Integer restaurantId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow();
        List<Restaurant> restaurants = account.getRestaurants();

        if(restaurants.contains(restaurant)){
            return new RestaurantIsPresentDto(1);

        }
        return new RestaurantIsPresentDto(0);


    }

    public List<RestaurantFindAllAccountResponseV2Dto> findAllAccountRestaurantsV2(Integer accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow();
        List<Restaurant> restaurants = account.getRestaurants();

        return restaurants.stream().map(
                restaurant -> new RestaurantFindAllAccountResponseV2Dto(
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
                )
        ).toList();
    }

    public RestaurantFindAllAccountResponseV2Dto findByIdV2(Integer restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow();
        return new RestaurantFindAllAccountResponseV2Dto(
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
        );
    }

    public List<RestaurantSearchFilterResponseDto> searchByFilter(RestaurantSearchFilterRequestDto requestDto) {
        List<Integer> restaurantFoodCategoryIds = reviewService.getRestaurantFoodCategoryIds(requestDto.getRestaurantFoodCategories());
        RestaurantFilterDto filter = new RestaurantFilterDto(requestDto.getIsDescend(), restaurantFoodCategoryIds, requestDto.getRegionId());
        List<SearchRestaurantQueryDto> searchRestaurantQueryDtos = restaurantRepository.findByFilter(filter);
        System.out.println(filter);
        System.out.println(searchRestaurantQueryDtos);
        return searchRestaurantQueryDtos.stream().map(
                searchRestaurantQueryDto -> {
                    Restaurant restaurant = restaurantRepository.findById(searchRestaurantQueryDto.getId()).get();
                    return new RestaurantSearchFilterResponseDto(
                            searchRestaurantQueryDto,
                            restaurant.getRestaurantFoodCategories().stream().map(
                                    foodCategory -> new FoodCategoryNaverSearchResponseDto(foodCategory.getName())).toList()
                    );
                }
        ).toList();
    }
}


