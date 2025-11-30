package com.healthcare.service;


import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.healthcare.dto.IngredientsRequestDto;
import com.healthcare.entities.FoodCategory;
import com.healthcare.entities.Ingredients;
import com.healthcare.entities.Recipe;
import com.healthcare.repository.FoodCategoryRepo;
import com.healthcare.repository.IngredientRepo;
import com.healthcare.repository.RecipeRepo;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class RecipeServiceImpl implements RecipeService {

//	private final RecipeRepo recipeRepo;
	private final FoodCategoryRepo categoryRepo;
	private final IngredientRepo ingredientRepo;
	private final RecipeRepo recipeRepo;
	private final ModelMapper mapper;

	public Recipe addCategory(String Category) {
		Optional<FoodCategory> fc = categoryRepo.findByName(Category);
		
		// if already in database
		if(fc.isEmpty()) {
			Recipe rc = new Recipe();
			rc.setCategories(fc.get());
			return rc;
		}
		
		//if not in database
		else {
			FoodCategory ff = new FoodCategory();
			ff.setName(Category);
			Recipe rc = new Recipe();
			rc.setCategories(ff);
			categoryRepo.save(ff);
			return rc;
		}
	}
	
	@Override
	public Recipe addIngredients(Recipe recipe, List<IngredientsRequestDto> ingredientlist) {

		ingredientlist.stream().forEach(s->{
//			System.out.println(s);
			Ingredients newIng = mapper.map(s, Ingredients.class);
			newIng.setRecipe(recipe);
			newIng = ingredientRepo.save(newIng);
		});
		return recipe;
	
	}


//	List<CreatorDetailsDto> findAll();

//	Recipe findById(Long id);
}
