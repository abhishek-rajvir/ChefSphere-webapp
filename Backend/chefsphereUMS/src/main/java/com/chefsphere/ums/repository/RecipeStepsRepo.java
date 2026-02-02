package com.chefsphere.ums.repository;

import com.chefsphere.ums.entities.Recipe;
import com.chefsphere.ums.entities.RecipeSteps;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeStepsRepo extends JpaRepository<RecipeSteps, Long>{

	void deleteByRecipe(Recipe recipe);

}
