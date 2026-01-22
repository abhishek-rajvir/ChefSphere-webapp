package com.chefsphere.ums.service;


import java.util.List;

import com.chefsphere.ums.dto.CreatorDetailsDto;
import com.chefsphere.ums.dto.FoodieDetailsDto;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.Foodie;

import jakarta.servlet.http.HttpServletRequest;

public interface FoodieService {

	Long addFoodie(Foodie newFoodie);
	
	Foodie findById(Long id);

	void updateFoodie(Foodie f);

	List<FoodieDetailsDto> findAll();

	Foodie findByIdWithCreators(Long id);
	
	Creator findCreatorWithFoodies(Long creator_id);

	Long followCreator(HttpServletRequest req, Long creator_id);

	Long unfollowCreator(HttpServletRequest req, Long creator_id);

	Long whetherfollowCreator(HttpServletRequest req, Long creator_id);

	List<CreatorDetailsDto> allFollowing(HttpServletRequest req);
}
