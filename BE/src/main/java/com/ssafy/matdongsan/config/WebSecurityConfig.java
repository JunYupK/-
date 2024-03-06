package com.ssafy.matdongsan.config;

import com.ssafy.matdongsan.security.JwtAuthenticationFilter;
import com.ssafy.matdongsan.security.OAuthSuccessHandler;
import com.ssafy.matdongsan.security.OAuthUserServiceImpl;
import com.ssafy.matdongsan.security.RedirectUrlCookieFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final OAuthUserServiceImpl oAuthUserService;
    private final OAuthSuccessHandler oAuthSuccessHandler;
    private final RedirectUrlCookieFilter redirectUrlCookieFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/**", "/auth/**", "/oauth2/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login((oauth) -> oauth
                                .redirectionEndpoint((endpointConfig) -> endpointConfig.baseUri("/oauth2/kakao/**"))
                                .authorizationEndpoint((endpoint) -> endpoint.baseUri("/auth/authorize"))
                                .userInfoEndpoint((endpoint) -> endpoint.userService(oAuthUserService))
                                .successHandler(oAuthSuccessHandler)
                )
                .exceptionHandling((ex) -> ex
                        .authenticationEntryPoint(new Http403ForbiddenEntryPoint()))

                .addFilterAfter(jwtAuthenticationFilter, CorsFilter.class)
                .addFilterBefore(redirectUrlCookieFilter, OAuth2AuthorizationRequestRedirectFilter.class)
        ;

        return http.build();
    }

}
