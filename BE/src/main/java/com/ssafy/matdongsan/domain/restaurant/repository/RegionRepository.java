package com.ssafy.matdongsan.domain.restaurant.repository;

import com.ssafy.matdongsan.domain.restaurant.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RegionRepository extends JpaRepository<Region,Short> {


    Optional<Region> findByCode(String code);



    Optional<Region> findByCityAndCountyAndDistrict(String city, String county, String district);
//    @Query("SELECT r.id FROM Region r WHERE r.code = :code")
//    Optional<Short> findIdByCode(String code);

    Region findOneByDistrict(String district);

}
