package com.chefsphere.ums.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chefsphere.ums.entities.Recipe;
import com.chefsphere.ums.entities.RecipeSteps;

public interface RecipeStepsRepo extends JpaRepository<RecipeSteps, Long>{

	void deleteByRecipe(Recipe recipe);

}
