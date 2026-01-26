package com.chefsphere.ums.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chefsphere.ums.entities.Ingredients;
import com.chefsphere.ums.entities.Recipe;

public interface IngredientRepo extends JpaRepository<Ingredients, Long> {

//	@Query("SELECT i FROM Ingredients i WHERE i.recipe =:rid")
//	List<Ingredients> findByRecipeid(@Param("rid") Long rid);
	List<Ingredients> findByRecipe_RecipeId(Long rid);

	Set<Recipe> findByNameIgnoreCase(String name);

	void deleteByRecipe(Recipe recipe);


}
