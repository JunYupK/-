package com.ssafy.matdongsan.domain.subcription.api;

import com.ssafy.matdongsan.domain.account.dto.AccountSimpleResponseDto;
import com.ssafy.matdongsan.domain.subcription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/subscription")
@Slf4j
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping("/{accountId}")
    public ResponseEntity<?> subscribe(@AuthenticationPrincipal String email, @PathVariable Integer accountId) {
        log.info("email={}", email);
        subscriptionService.save(email, accountId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<?> unsubscribe(@AuthenticationPrincipal String email, @PathVariable Integer accountId) {
        log.info("email={}", email);
        subscriptionService.unsubscribe(email, accountId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<?> getSubscriptions(@PathVariable Integer accountId) {
        List<AccountSimpleResponseDto> subscriptions = subscriptionService.getSubscriptions(accountId);
        return ResponseEntity.ok().body(subscriptions);
    }

}
