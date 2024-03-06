package com.ssafy.matdongsan.security;

import com.ssafy.matdongsan.domain.account.model.Account;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {

    private final static String SECRET_KEY = "p7s6zKhimiDFK7XwYbDwRH+u9rNj36SxdNSPbhLz91W5oA2dM2S5L519ZpX9sT91Gt/YjnyGzLSR6ixJkT5/EQ==";

    public String create(String email) {
        Date expiryDate = Date.from(
                Instant.now()
                        .plus(1, ChronoUnit.DAYS));

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(email)
                .setIssuer("matdongsan")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }

    public String create(Account userEntity) {
        Date expiryDate = Date.from(
                Instant.now()
                        .plus(1, ChronoUnit.DAYS));

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(userEntity.getNickname())
                .setIssuer("matdongsan")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }

    public String create(final Authentication authentication) {
        ApplicationOAuth2User userPrincipal = (ApplicationOAuth2User) authentication.getPrincipal();
        Date expiryDate = Date.from(
                Instant.now()
                        .plus(1, ChronoUnit.DAYS));

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(userPrincipal.getName())
                .setIssuer("matdongsan")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }

    public String validateAndGetUserId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

}

