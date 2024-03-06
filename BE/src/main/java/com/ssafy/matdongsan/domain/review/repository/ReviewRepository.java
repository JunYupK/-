package com.ssafy.matdongsan.domain.review.repository;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long>,ReviewRepositoryCustom {

    List<Review> findAllByAccount(Account myAccount);


    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "delete from Review  r where r.account = :account and r.restaurant = :restaurant")
    void deleteByAccountAndRestaurant(Account account, Restaurant restaurant);

    @Query(value = "select distinct r.restaurant from Review  r where r.account = :account and r.restaurant.name like %:name% ")
    List<Restaurant> searchByRestaurantName(String name, Account account);



}
