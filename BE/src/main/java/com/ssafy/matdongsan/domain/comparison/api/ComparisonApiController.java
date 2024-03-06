package com.ssafy.matdongsan.domain.comparison.api;

import com.ssafy.matdongsan.domain.comparison.dto.ComparisonGetResponseDto;
import com.ssafy.matdongsan.domain.comparison.dto.ComparisonSaveRequestDto;
import com.ssafy.matdongsan.domain.comparison.dto.ComparisonStatisticsRequestDto;
import com.ssafy.matdongsan.domain.comparison.dto.ComparisonStatisticsResponseDto;
import com.ssafy.matdongsan.domain.comparison.service.ComparisonService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ComparisonApiController {
    private final ComparisonService comparisonService;

    @PostMapping("/comparison/statistics/{accountId}")
    public ResponseEntity<?> createStatistics(@RequestBody @Valid ComparisonStatisticsRequestDto requestDto, @PathVariable String accountId){
        ComparisonStatisticsResponseDto responseDto=comparisonService.createStatistics(requestDto);
        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/comparison/{accountId}")
    public ResponseEntity<?> saveComparison(
            @RequestBody @Valid ComparisonSaveRequestDto requestDto,
            @PathVariable Integer accountId){
        comparisonService.save(accountId, requestDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/comparison/{accountId}")
    public ResponseEntity<?> getComparison(
            @PathVariable Integer accountId){
        ComparisonGetResponseDto responseDto = comparisonService.get(accountId);
        return ResponseEntity.ok().body(responseDto);
    }




}
