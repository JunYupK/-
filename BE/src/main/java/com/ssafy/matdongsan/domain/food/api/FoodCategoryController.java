package com.ssafy.matdongsan.domain.food.api;

import com.ssafy.matdongsan.domain.food.dto.FoodCategoryRequest;
import com.ssafy.matdongsan.domain.food.dto.FoodCategoryResponse;
import com.ssafy.matdongsan.domain.food.dto.FoodRequest;
import com.ssafy.matdongsan.domain.food.dto.FoodResponse;
import com.ssafy.matdongsan.domain.food.service.FoodCategoryService;
import com.ssafy.matdongsan.domain.food.service.FoodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/food-category")
@RequiredArgsConstructor
@Tag(name = "food", description = "food API")
public class FoodCategoryController {


    private final FoodCategoryService foodCategoryService;

    @Operation(summary = "get a food category by id", tags = { "food" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = FoodCategoryResponse.class))
            })
    })
    @GetMapping("/{foodCategoryId}")
    public ResponseEntity<?> getFoodCategoryById(@PathVariable Integer foodCategoryId) {
        FoodCategoryResponse response = foodCategoryService.getFoodCategory(foodCategoryId);
        if (response == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "get a food category by name", tags = { "food" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = FoodCategoryResponse.class))
            })
    })
    @GetMapping
    public ResponseEntity<?> getFoodCategoryByName(@RequestParam String name) {
        FoodCategoryResponse response = foodCategoryService.getFoodCategory(name);
        if (response == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "register a food category", tags = { "food" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = FoodCategoryResponse.class))
            })
    })
    @PostMapping
    public ResponseEntity<?> registerFoodCategory(@RequestBody FoodCategoryRequest request) {
        FoodCategoryResponse response = foodCategoryService.saveFoodCategory(request);
        if (response == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().body(response);
    }

}
