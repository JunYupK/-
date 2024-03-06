package com.ssafy.matdongsan.domain.restaurant.api;

import com.ssafy.matdongsan.domain.restaurant.dto.RegionFindAllDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RegionIdRequestDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RegionIdResponseDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveRequestDto;
import com.ssafy.matdongsan.domain.restaurant.service.RegionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RegionApiController {
    private final RegionService regionService;
    @GetMapping("/region")
    public ResponseEntity<?> getRegions(){
        List<RegionFindAllDto> regions = regionService.getAllRegion();
        return ResponseEntity.ok().body(regions);
    }
    @PostMapping("/region")
    public ResponseEntity<?> getRegionId(@RequestBody @Valid RegionIdRequestDto requestDto){
        RegionIdResponseDto responseDto= regionService.getId(requestDto);
        return ResponseEntity.ok().body(responseDto);
    }
}
