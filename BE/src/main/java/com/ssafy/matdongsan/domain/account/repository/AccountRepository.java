package com.ssafy.matdongsan.domain.account.repository;

import com.ssafy.matdongsan.domain.account.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    boolean existsByEmail(String email);

    Account findByEmail(String email);

    @Query("SELECT a FROM Account a ORDER BY a.follower DESC")
    List<Account> findAllOrderByFollower();

    @Query("SELECT a FROM Account a WHERE a.nickname LIKE %:query% ")
    List<Account> findAllByNickname(String query);
}
