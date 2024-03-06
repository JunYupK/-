package com.ssafy.matdongsan.domain.food.model;

import com.ssafy.matdongsan.domain.account.model.Account;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    @EqualsAndHashCode.Include
    private Integer id;

    @Column(name = "food_name", length = 100)
    private String name;

    @Column(name = "food_image", length = 255)
    private String image;

    @ManyToMany(mappedBy = "bannedFoods")
    private List<Account> accounts = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "food_category_assignment",
            joinColumns = @JoinColumn(name = "food_id"),
            inverseJoinColumns = @JoinColumn(name = "food_category_id")
    )
    private List<FoodCategory> foodCategories = new ArrayList<>();
}
