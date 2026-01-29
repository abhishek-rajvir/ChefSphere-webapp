package com.chefsphere.ums.service;

import java.util.List;

import com.chefsphere.ums.dto.CreatorRandomDTO;
import com.chefsphere.ums.dto.CreatorResponseDTO;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.User;

import jakarta.servlet.http.HttpServletRequest;

public interface CreatorService {

	List<CreatorResponseDTO> findAll();

	Creator findByUserId(Long uid);

	CreatorResponseDTO findById(Long id);

	void updateCreator(Creator changedCreator);

	List<CreatorRandomDTO> findRandomCreatorByQty(Long qty);

		Creator findByIdWithPosts(HttpServletRequest req);

	Creator findById(HttpServletRequest req);

	String createCreator(User u);

	Creator findByIdWithPosts(Long cid);

}
