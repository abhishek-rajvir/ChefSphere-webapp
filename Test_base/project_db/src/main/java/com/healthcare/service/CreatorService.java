package com.healthcare.service;


import java.util.List;

import com.healthcare.dto.CreatorDetailsDto;
import com.healthcare.entities.Creator;
import com.healthcare.entities.Post;

public interface CreatorService {

	void addCreator(Creator newCreator);

	List<CreatorDetailsDto> findAll();

	Creator findById(Long id);

	void updateCreator(Creator changedCreator) throws Exception;
	
	void newPost(Post p,Long Creator_id);
}
