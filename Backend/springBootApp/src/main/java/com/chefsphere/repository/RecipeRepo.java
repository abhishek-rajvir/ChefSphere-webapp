package com.chefsphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chefsphere.entities.Recipe;

public interface RecipeRepo extends JpaRepository<Recipe, Long>{

	Recipe findByRecipeName(String recipe_name);
	
}
