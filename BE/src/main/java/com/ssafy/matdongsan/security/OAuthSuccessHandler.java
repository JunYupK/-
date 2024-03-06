package com.ssafy.matdongsan.security;

import jakarta.servlet.http.Cookie;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

import static com.ssafy.matdongsan.security.RedirectUrlCookieFilter.REDIRECT_URI_PARAM;

@Slf4j
@Component
public class OAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final String LOCAL_REDIRECT_URL = "https://i10a209.p.ssafy.io:3000";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        TokenProvider tokenProvider = new TokenProvider();
        String token = tokenProvider.create(authentication);
        Optional<Cookie> oCookie = Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals(REDIRECT_URI_PARAM)).findFirst();
        Optional<String> redirectUri = oCookie.map(Cookie::getValue);
        log.info("token {}", token);
        response.sendRedirect(redirectUri.orElseGet(() -> LOCAL_REDIRECT_URL) + "/sociallogin?token=" + token);
    }
}