package com.chefsphere.ums.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chefsphere.ums.entities.Recipe;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {

	Recipe findByRecipeName(String recipe_name);

	Set<Recipe> findByPrepTimeLessThan(Long prep_time);

	Set<Recipe> findByPrepTimeGreaterThan(Long prep_time);

	@Query("SELECT r FROM Recipe r ORDER BY RAND() LIMIT :qty")
	List<Recipe> findRandomPosts(@Param("qty") Integer qty);

	// foodCategories → collection
	// _Name → FoodCategory.name (String)
	// IgnoreCase → applied to name
	Set<Recipe> findByFoodCategories_NameIgnoreCase(String categoryName);

}
