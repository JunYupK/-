package com.ssafy.matdongsan.domain.restaurant.api;


import com.ssafy.matdongsan.domain.restaurant.dto.*;
import com.ssafy.matdongsan.domain.restaurant.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RestaurantApiController {
    private final RestaurantService restaurantService;

    @Operation(summary = "[버전-1] (전체)음식점 등록 API", description = "네이버 API 버전 1사용, 하나씩 저장")
    @PostMapping("/restaurant/common")
    public ResponseEntity<?> createCommonRestaurant(@RequestBody @Valid RestaurantSaveRequestDto requestDto){
        RestaurantSaveResponseDto restaurantResponse= restaurantService.save(requestDto);
        return ResponseEntity.ok().body(restaurantResponse);
    }

    @Operation(summary = "[버전-1] (전체)음식점 목록 조회 API", description = "thumUrl,menuInfo,category 정보 없는 버전")
    @GetMapping("/restaurant/common")
    public ResponseEntity<?> readAllCommonRestaurants(){
        List<RestaurantFindAllResponseDto> responseDtos =  restaurantService.findAll();
        return  ResponseEntity.ok().body(responseDtos);
    }


    @Operation(summary = "[버전-1] 음식점 상세 조회 API", description = "thumUrl,menuInfo,category 정보 없는 버전")
    @GetMapping("/restaurant/common/{restaurantId}")
    public ResponseEntity<?> readOneCommonRestaurant(
            @PathVariable("restaurantId") Integer restaurantId
    ){
        RestaurantFindOneResponseDto responseDto =  restaurantService.findById(restaurantId);
        return  ResponseEntity.ok().body(responseDto);
    }

    @Operation(summary = "[버전-2] 음식점 상세 조회 API", description = "thumUrl,menuInfo,category 정보 있는 버전")
    @GetMapping("/restaurant/common/v2/{restaurantId}")
    public ResponseEntity<?> readOneCommonRestaurantV2(
            @PathVariable("restaurantId") Integer restaurantId
    ){
        RestaurantFindAllAccountResponseV2Dto responseDto =  restaurantService.findByIdV2(restaurantId);
        return  ResponseEntity.ok().body(responseDto);
    }

    @Operation(summary = "[버전-공통] 해당 계정에 음식점 저장 API", description = "공통 사용")
    @PostMapping("/restaurant/{accountId}")
    public ResponseEntity<?> createAccountRestaurant(
            @PathVariable("accountId") Integer accountId,
            @RequestParam(value = "restaurantId") Integer restaurantId ){
        restaurantService.accountSave(accountId,restaurantId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @Operation(summary = "[버전-1] 해당 계정에 저장된 음식점 목록 조회 API", description = "thumUrl,menuInfo,category 정보 없는 버전")
    @GetMapping("/restaurant/{accountId}")
    public ResponseEntity<?> readAllAccountRestaurants(
            @PathVariable("accountId") Integer accountId){
        List<RestaurantFindAllAccountResponseDto> responseDtos =  restaurantService.findAllAccountRestaurants(accountId);
        return  ResponseEntity.ok().body(responseDtos);
    }

    @Operation(summary = "[버전-2] 해당 계정에 저장된 음식점 목록 조회 API", description = "thumUrl,menuInfo,category 정보 있는 버전")
    @GetMapping("/restaurant/v2/{accountId}")
    public ResponseEntity<?> readAllAccountRestaurantsV2(
            @PathVariable("accountId") Integer accountId){
        List<RestaurantFindAllAccountResponseV2Dto> responseDtos =  restaurantService.findAllAccountRestaurantsV2(accountId);
        return  ResponseEntity.ok().body(responseDtos);
    }

    @Operation(summary = "[버전-공통] 해당 계정에 저장된 음식점 및 리뷰 삭제 API", description = "공통 사용")
    @DeleteMapping("/restaurant/{accountId}/{restaurantId}")
    public ResponseEntity<?> deleteOneAccountRestaurant(
            @PathVariable("accountId") Integer accountId,
            @PathVariable("restaurantId") Integer restaurantId){
        restaurantService.delete(accountId,restaurantId);
        return  ResponseEntity.ok(HttpStatus.OK);
    }

    @Operation(summary = "[버전-공통] 해당 계정에 저장된 음식점 목록에 음식점 있는지 없는지 조회  API", description = "공통 사용")
    @GetMapping("/restaurant/{accountId}/{restaurantId}")
    public ResponseEntity<?> getIsPresentAccountRestaurant(
            @PathVariable("accountId") Integer accountId,
            @PathVariable("restaurantId") Integer restaurantId){
        RestaurantIsPresentDto dto= restaurantService.getIsPresent(accountId,restaurantId);
        return  ResponseEntity.ok().body(dto);
    }

    @Operation(summary = "[필터 검색] 음식점 필터 검색  API")
    @PostMapping("/restaurant/search/filter")
    public ResponseEntity<?> searchByFilterRestaurant(
            @RequestBody @Valid RestaurantSearchFilterRequestDto requestDto ){
        List<RestaurantSearchFilterResponseDto> responseDtos = restaurantService.searchByFilter(requestDto);
        return  ResponseEntity.ok().body(responseDtos);
    }
}
