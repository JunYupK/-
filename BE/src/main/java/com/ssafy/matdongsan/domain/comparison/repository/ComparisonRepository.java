package com.ssafy.matdongsan.domain.comparison.repository;


import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.comparison.model.Comparison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ComparisonRepository extends JpaRepository<Comparison, Integer> {
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "delete from Comparison  c where c.comparer = :comparer")
    void deleteAllByAccountId(Account comparer);

   List<Comparison> findAllByComparer(Account myAccount);
}
