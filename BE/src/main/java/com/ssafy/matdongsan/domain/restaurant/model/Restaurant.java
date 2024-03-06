package com.ssafy.matdongsan.domain.restaurant.model;

import com.ssafy.matdongsan.domain.BaseEntity;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.review.model.Review;
import jakarta.persistence.*;
import lombok.*;


import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="restaurant")
@ToString
@EntityListeners(AuditingEntityListener.class)

public class Restaurant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Integer id;

    @Column(name = "restaurant_name", length = 100)
    private String name;

    private Integer mapx;
    private Integer mapy;

    @Column(length = 100)
    private String address;

    @Column(length = 100)
    private String roadAddress;

    @Column(length = 16)
    private String phone;

    @Column(length = 1000)
    private String thumUrl;

    @Column(columnDefinition = "TEXT")
    private String menuInfo;


    @OneToMany(mappedBy = "restaurant")
    private List<Review> reviews = new ArrayList<>();

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "region_id")
    private Region region;

    @ManyToMany(mappedBy = "restaurants")
    private List<Account> accounts = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "restaurant_food_category",
            joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "food_category_id")
    )
    List<FoodCategory> restaurantFoodCategories = new ArrayList<>();

}