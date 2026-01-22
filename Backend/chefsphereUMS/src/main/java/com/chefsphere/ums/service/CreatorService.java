package com.chefsphere.ums.service;


import java.util.List;

import com.chefsphere.ums.dto.CreatorDetailsDto;
import com.chefsphere.ums.dto.CreatorRandomDto;
import com.chefsphere.ums.dto.FoodieDetailsDto;
import com.chefsphere.ums.entities.Creator;

import jakarta.servlet.http.HttpServletRequest;

public interface CreatorService {

	Long addCreator(Creator newCreator);

	List<CreatorDetailsDto> findAll();

	Creator findById(Long id);

	void updateCreator(Creator changedCreator) throws Exception;

	List<FoodieDetailsDto> getFollowersById(Long creator_id);

	Creator findByUserId(Long id);

	List<CreatorRandomDto> findRandomCreatorByQty(Long qty);

	List<FoodieDetailsDto> allFollowers(HttpServletRequest req);
	
}
