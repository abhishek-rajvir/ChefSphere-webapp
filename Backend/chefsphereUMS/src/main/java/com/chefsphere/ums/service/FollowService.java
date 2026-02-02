package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.CreatorResponseDTO;
import com.chefsphere.ums.dto.FoodieResponseDTO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface FollowService {

	public Long totalFollowers(Long cid) ;

	public List<FoodieResponseDTO> getFollowers(HttpServletRequest req);
	
	Long followCreator(HttpServletRequest req, Long creator_id);

	Long unfollowCreator(HttpServletRequest req, Long creator_id);

	Long whetherfollowCreator(HttpServletRequest req, Long creator_id);

	List<CreatorResponseDTO> allFollowing(HttpServletRequest req);
}
