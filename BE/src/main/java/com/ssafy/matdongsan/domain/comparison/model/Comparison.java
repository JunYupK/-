package com.ssafy.matdongsan.domain.comparison.model;

import com.ssafy.matdongsan.domain.BaseEntity;
import com.ssafy.matdongsan.domain.account.model.Account;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comparison extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comparison_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "comparing_account_id")
    private Account comparer;

    @ManyToOne
    @JoinColumn(name = "compared_account_id")
    private Account compared;

    private boolean isHidden = false;

    @Builder
    public Comparison(Account comparer, Account compared, boolean isHidden) {
        this.comparer = comparer;
        this.compared = compared;
        this.isHidden = isHidden;
    }
}
