package com.healthcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.Recipe;

public interface RecipeRepo extends JpaRepository<Recipe, Long>{

	Recipe findByRecipeName(String recipe_name);
	
}
