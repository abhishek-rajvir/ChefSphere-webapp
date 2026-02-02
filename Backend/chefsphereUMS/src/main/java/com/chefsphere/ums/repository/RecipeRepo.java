package com.chefsphere.ums.repository;

import com.chefsphere.ums.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface RecipeRepo extends JpaRepository<Recipe, Long> {

	Optional<Recipe> findByPost_pid(Long postId);
	
	Optional<Recipe> findByRecipeName(String recipe_name);

	Set<Recipe> findByPrepTimeLessThan(Long prep_time);

	Set<Recipe> findByPrepTimeGreaterThan(Long prep_time);

	@Query("SELECT r FROM Recipe r ORDER BY RAND() LIMIT :qty")
	List<Recipe> findRandomPosts(@Param("qty") Integer qty);

	// foodCategories → collection
	// _Name → FoodCategory.name (String)
	// IgnoreCase → applied to name
	Set<Recipe> findByFoodCategories_NameContainingIgnoreCase(String categoryName);

}
