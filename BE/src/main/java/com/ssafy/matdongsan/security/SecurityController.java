package com.ssafy.matdongsan.security;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/security")
@RequiredArgsConstructor
public class SecurityController {

    private final TokenProvider tokenProvider;

    @GetMapping
    public String getToken(@RequestParam String email) {
        return tokenProvider.create(email);
    }
}
