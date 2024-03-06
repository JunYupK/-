package com.ssafy.matdongsan.domain.subcription.repository;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.subcription.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Short> {
    Subscription findBySubscriberIdAndSubscribedId(Integer subscriberId, Integer subscribedId);
    boolean existsBySubscriberIdAndSubscribedId(Integer subscriberId, Integer subscribedId);
    List<Subscription> findBySubscriberId(Integer accountId);
}
