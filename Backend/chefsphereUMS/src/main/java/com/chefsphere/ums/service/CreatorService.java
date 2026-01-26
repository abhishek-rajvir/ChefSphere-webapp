package com.chefsphere.ums.service;

import java.util.List;

import com.chefsphere.ums.dto.CreatorDetailsDTO;
import com.chefsphere.ums.dto.CreatorRandomDTO;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.User;

import jakarta.servlet.http.HttpServletRequest;

public interface CreatorService {

	List<CreatorDetailsDTO> findAll();

	Creator findById(HttpServletRequest req);

	Creator findById(Long id);

	void updateCreator(Creator changedCreator);

	Creator findByUserId(Long id);

	List<CreatorRandomDTO> findRandomCreatorByQty(Long qty);

	String createCreator(User u);

}
