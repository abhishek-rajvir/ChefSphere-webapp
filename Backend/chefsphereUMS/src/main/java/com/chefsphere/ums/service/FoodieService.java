package com.chefsphere.ums.service;


import java.util.List;

import com.chefsphere.ums.dto.FoodieResponseDTO;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.Foodie;
import com.chefsphere.ums.entities.User;

import jakarta.servlet.http.HttpServletRequest;

public interface FoodieService {

	Foodie findById(Long id);

	void updateFoodie(Foodie f);

	List<FoodieResponseDTO> findAll();

	Foodie findByIdWithCreators(Long id);
	
	Creator findCreatorWithFoodies(Long creator_id);

	Foodie findByUserIdWithCreators(Long userid);

	Foodie findById(HttpServletRequest req);

	FoodieResponseDTO findByIdDto(HttpServletRequest req);

	String createFoodie(User u);

	FoodieResponseDTO findByIdDto(Long id);

}
