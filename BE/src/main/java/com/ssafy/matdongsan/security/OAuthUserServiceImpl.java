package com.ssafy.matdongsan.security;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.repository.AccountRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class OAuthUserServiceImpl extends DefaultOAuth2UserService {

    @Autowired
    private AccountRepository userRepository;

    public OAuthUserServiceImpl() {
        super();
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // DefaultOAuth2UserService의 기존 loadUser를 호출한다. 이 메서드가 user-info-uri를 이용해 사용자 정보를 가져오는 부분이다.
        final OAuth2User oAuth2User = super.loadUser(userRequest);

        try {
            // 디버깅을 돕기 위해 사용자 정보가 어떻게 되는지 로깅한다. 테스팅 시에만 사용해야 한다.
            log.info("OAuth2User attributes {} ", new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // login 필드를 가져온다.
        Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
        Map<String, Object> kakao_account = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        String nickname = (String) properties.get("nickname");
        String email = (String) kakao_account.get("email");
        Account userEntity = null;
        // 유저가 존재하지 않으면 새로 생성한다.
        if(!userRepository.existsByEmail(email)) {
            userEntity = Account.builder()
                    .nickname(nickname)
                    .email(email)
                    .build();
            userEntity = userRepository.save(userEntity);
        } else {
            userEntity = userRepository.findByEmail(email);
        }

        log.info("Successfully pulled user info email {}", email);
        // 변경 부분
        return new ApplicationOAuth2User(userEntity.getEmail(), oAuth2User.getAttributes());
    }
}