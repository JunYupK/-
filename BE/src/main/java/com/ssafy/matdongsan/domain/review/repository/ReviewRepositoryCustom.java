package com.ssafy.matdongsan.domain.review.repository;

import com.ssafy.matdongsan.domain.review.dto.ReviewFilterDto;
import com.ssafy.matdongsan.domain.review.repository.query.SearchReviewQueryDto;

import java.util.List;

public interface ReviewRepositoryCustom {

    List<SearchReviewQueryDto> searchByFilter(ReviewFilterDto filter);



}
