package com.chefsphere.ums.service;


import com.chefsphere.ums.dto.RatingRequestDTO;

public interface RatingService {

	void newRating(RatingRequestDTO c_dto);

	void deleteRatingById(Long postId);

	Double findRatingByPostId(Long pid);
}
