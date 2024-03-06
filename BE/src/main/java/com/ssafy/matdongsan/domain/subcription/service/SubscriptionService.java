package com.ssafy.matdongsan.domain.subcription.service;

import com.ssafy.matdongsan.domain.account.dto.AccountSimpleResponseDto;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.repository.AccountRepository;
import com.ssafy.matdongsan.domain.subcription.model.Subscription;
import com.ssafy.matdongsan.domain.subcription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final AccountRepository accountRepository;

    public void save(String email, Integer accountId) {
        Account subscriber = accountRepository.findByEmail(email);
        Account subscribed = accountRepository.findById(accountId).orElseThrow();
        if (subscriber.getId().equals(subscribed.getId())) return;
        if (subscriptionRepository.existsBySubscriberIdAndSubscribedId(subscriber.getId(), subscribed.getId())) return;
        Subscription subscription = Subscription.builder()
                        .subscriber(subscriber)
                        .subscribed(subscribed)
                        .build();
        subscribed.increaseFollower();
        subscriptionRepository.save(subscription);
    }

    public void unsubscribe(String email, Integer accountId) {
        Integer subscriberId = accountRepository.findByEmail(email).getId();
        Subscription subscription = subscriptionRepository.findBySubscriberIdAndSubscribedId(subscriberId, accountId);
        Account subscribed = accountRepository.findById(accountId).orElseThrow();
        subscribed.decreaseFollower();
        subscriptionRepository.delete(subscription);
    }

    public List<AccountSimpleResponseDto> getSubscriptions(Integer accountId) {
        List<AccountSimpleResponseDto> ret = new ArrayList<>();
        List<Subscription> subscriptions = subscriptionRepository.findBySubscriberId(accountId);
        for (Subscription subscription : subscriptions) {
            Account subscribed = subscription.getSubscribed();
            AccountSimpleResponseDto dto = AccountSimpleResponseDto.builder()
                    .id(subscribed.getId())
                    .picture(subscribed.getPicture())
                    .nickname(subscribed.getNickname())
                    .follower(subscribed.getFollower())
                    .build();
            ret.add(dto);
        }
        return ret;
    }
}
