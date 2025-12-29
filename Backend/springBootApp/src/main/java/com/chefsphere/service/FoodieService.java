package com.chefsphere.service;


import java.util.List;

import com.chefsphere.dto.FoodieDetailsDto;
import com.chefsphere.entities.Creator;
import com.chefsphere.entities.Foodie;

public interface FoodieService {

	void addFoodie(Foodie newFoodie);
	
	Foodie findById(Long id);

	void updateFoodie(Foodie f);

	List<FoodieDetailsDto> findAll();

	Foodie findByIdWithCreators(Long id);
	
	Creator findCreatorWithFoodies(Long creator_id);
	
}
