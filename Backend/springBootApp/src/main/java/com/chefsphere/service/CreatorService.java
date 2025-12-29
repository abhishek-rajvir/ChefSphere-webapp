package com.chefsphere.service;


import java.util.List;

import com.chefsphere.dto.CreatorDetailsDto;
import com.chefsphere.dto.FoodieDetailsDto;
import com.chefsphere.entities.Creator;

public interface CreatorService {

	void addCreator(Creator newCreator);

	List<CreatorDetailsDto> findAll();

	Creator findById(Long id);

	void updateCreator(Creator changedCreator) throws Exception;

	List<FoodieDetailsDto> getFollowersById(Long creator_id);
	
//	void newPost(Post p,Long Creator_id);

//	List<PostRequestDto> findAllPostById(Creator c);
}
