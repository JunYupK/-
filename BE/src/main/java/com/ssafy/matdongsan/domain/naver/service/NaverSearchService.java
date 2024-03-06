
package com.ssafy.matdongsan.domain.naver.service;

import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.food.repository.FoodCategoryRepository;
import com.ssafy.matdongsan.domain.naver.dto.NaverSearchSaveRequestDto;
import com.ssafy.matdongsan.domain.naver.dto.NaverSearchSaveResponseDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RegionNaverSearchInfoDto;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.repository.RegionRepository;
import com.ssafy.matdongsan.domain.restaurant.repository.RestaurantRepository;
import com.ssafy.matdongsan.domain.restaurant.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NaverSearchService {
    private final RestaurantRepository restaurantRepository;
    private final RegionRepository regionRepository;
    private final FoodCategoryRepository foodCategoryRepository;
    private final RestaurantService restaurantService;



    @Transactional
    public List<NaverSearchSaveResponseDto> searchRestaurants(String query) {
        //공식 문서 파라미터값 참고
        URI uri = UriComponentsBuilder
                .fromUriString("https://map.naver.com")
                .path("/v5/api/search")
                .queryParam("caller","pcweb")
                .queryParam("query",query+"+맛집")
                .queryParam("displayCount",20)
                .queryParam("type","all")
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUri();
        //Header 설정
        RequestEntity<Void> req = RequestEntity
                .get(uri)
                .build();

        //응답 클래스 지정
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> naverResult = restTemplate.exchange(req, String.class);
        return saveRestaurants(naverResult);
    }



    public List<NaverSearchSaveResponseDto> saveRestaurants(ResponseEntity<String> naverResult) {
        JSONObject jObj = new JSONObject(naverResult.getBody());
        JSONObject jObjResult = jObj.getJSONObject("result");

        JSONArray restaurantsJsonArray = jObj.getJSONObject("result").getJSONObject("place").getJSONArray("list");
        List<NaverSearchSaveRequestDto> requestDtos = extractRequestDto(restaurantsJsonArray);
        System.out.println(requestDtos.get(0));
        List<NaverSearchSaveResponseDto> responseDtos = new ArrayList<>();

        for (NaverSearchSaveRequestDto requestDto: requestDtos){
            NaverSearchSaveResponseDto responseDto = restaurantService.saveNaverSearchV2(requestDto);
            responseDtos.add(responseDto);
        }

        return responseDtos;
    }
    private List<NaverSearchSaveRequestDto> extractRequestDto(JSONArray restaurantsJsonArray){
            List<NaverSearchSaveRequestDto> requestDtos= new ArrayList<>();
            for( int i =0; i<restaurantsJsonArray.length(); i++) {
                JSONObject rawData = restaurantsJsonArray.getJSONObject(i);
                String name = rawData.getString("name");
                Integer mapx = coordToInteger(rawData.getDouble("x"));
                Integer mapy = coordToInteger(rawData.getDouble("y"));
                String address = rawData.getString("address");
                String roadAddress = rawData.getString("roadAddress");
                String phone = rawData.getString("tel");
                String thumUrl = rawData.getString("thumUrl");
                String menuInfo = rawData.getString("menuInfo");
                JSONArray category = rawData.getJSONArray("category");
                List<FoodCategory> restaurantFoodCategories = extractFoodCategories(category);
                NaverSearchSaveRequestDto dto = new NaverSearchSaveRequestDto(name, mapx, mapy, address, roadAddress, phone, thumUrl, menuInfo, restaurantFoodCategories);
                requestDtos.add(dto);
            }
            return requestDtos;
        }

    private List<FoodCategory> extractFoodCategories(JSONArray category) {
        List<FoodCategory> restaurantFoodCategories = new ArrayList<>();
        for( int i =0; i<category.length(); i++){
            String foodCategoryName = category.getString(i);
            FoodCategory foodCategory = foodCategoryRepository.findByName(foodCategoryName).orElseGet(()->{
                FoodCategory newFoodCategory = new FoodCategory(foodCategoryName);
                return foodCategoryRepository.save(newFoodCategory);
            });
            restaurantFoodCategories.add(foodCategory);
        }
        return restaurantFoodCategories;
    }

    private Region findOrSaveRegion(RegionNaverSearchInfoDto extractRegionInfo) {
        //1) 코드로 찾기
        Region region = regionRepository.findByCode(extractRegionInfo.getRegionCode()).orElseGet( ()->
        {
            //2) 만약 법정동 코드가 없을 경우 새로 등록
            // 시 , 시약어, 구/군, 동 뽑기
            // ex- 강원도 -> 강원특별자치도로 개편해서 코드 없음
            Region newRegion = new Region(extractRegionInfo.getRegionCode(), extractRegionInfo.getRegionCity(),
                    extractRegionInfo.getRegionCounty(), extractRegionInfo.getRegionDistrict(), extractRegionInfo.getRegionMapx(), extractRegionInfo.getRegionMapy());

            //없으면 등록
            return regionRepository.save(newRegion);

        });
        return region;
    }


    private Integer coordToInteger(Double x){
        return Integer.parseInt(String.format("%.7f", x).replaceAll("\\.",""));

    }


}
