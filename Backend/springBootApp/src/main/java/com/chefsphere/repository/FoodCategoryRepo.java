package com.chefsphere.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chefsphere.entities.FoodCategory;

public interface FoodCategoryRepo extends JpaRepository<FoodCategory, Long>{
	
//	@Query("SELECT fc FROM FoodCategory fc WHERE fc.recipe =:rid")
//	List<FoodCategory> findByRecipeid(@Param("rid") Long rid);
	
	List<FoodCategory> findByNameInIgnoreCase(List<String> name);
	
	Optional<FoodCategory> findByNameIgnoreCase(String name);
	
}
