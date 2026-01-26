package com.chefsphere.ums.service;

import java.util.List;

import com.chefsphere.ums.dto.CreatorDetailsDTO;
import com.chefsphere.ums.dto.FoodieResponseDTO;

import jakarta.servlet.http.HttpServletRequest;

public interface FollowService {

	public Long totalFollowers(Long cid) ;

	public List<FoodieResponseDTO> getFollowers(HttpServletRequest req);
	
	Long followCreator(HttpServletRequest req, Long creator_id);

	Long unfollowCreator(HttpServletRequest req, Long creator_id);

	Long whetherfollowCreator(HttpServletRequest req, Long creator_id);

	List<CreatorDetailsDTO> allFollowing(HttpServletRequest req);
}
