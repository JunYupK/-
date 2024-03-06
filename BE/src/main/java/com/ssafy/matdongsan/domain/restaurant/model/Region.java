package com.ssafy.matdongsan.domain.restaurant.model;

import com.ssafy.matdongsan.domain.account.model.Account;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_id")
    @EqualsAndHashCode.Include
    private Short id;

    @Column(length = 8)
    private String code;

    @Column(length = 50)
    private String city;

    @Column(length = 50)
    private String county;

    @Column(length = 50)
    private String district;

    private Integer mapx;
    private Integer mapy;

    @ManyToMany(mappedBy = "regions")
    private List<Account> accounts = new ArrayList<>();

    @OneToMany
    private List<Restaurant> restaurants = new ArrayList<>();

    @Builder
    public Region(String code, String city, String county, String district, Integer mapx, Integer mapy) {
        this.code = code;
        this.city = city;
        this.county = county;
        this.district = district;
        this.mapx = mapx;
        this.mapy = mapy;
    }


}