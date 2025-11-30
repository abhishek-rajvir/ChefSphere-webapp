package com.healthcare.service;


import java.util.List;

import com.healthcare.dto.IngredientsRequestDto;
import com.healthcare.entities.Recipe;

public interface RecipeService {

	public Recipe addIngredients(Recipe recipe, List<IngredientsRequestDto> ingredientlist);

//	List<CreatorDetailsDto> findAll();

//	Recipe findById(Long id);
}
