package com.ssafy.matdongsan.domain.account.repository;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PersonTagRepository extends JpaRepository<PersonTag, Integer> {
    Optional<PersonTag> findByName(String name);

//    @Query("SELECT p FROM PersonTag p WHERE p.account = :account AND p.birthYear =:birthYear AND p.name = :name")
    Optional<PersonTag> findByAccountAndBirthYearAndName(Account account, int birthYear, String name);
}
