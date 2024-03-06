package com.ssafy.matdongsan.domain.restaurant.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    DUPLICATED_RESTAURNT_NAME(HttpStatus.CONFLICT, "restaurant name is duplicated");
    private HttpStatus status;
    private String message;
}
