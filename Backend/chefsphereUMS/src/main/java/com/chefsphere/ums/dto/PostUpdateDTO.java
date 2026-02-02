package com.chefsphere.ums.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PostUpdateDTO {

	private String postTitle;

	private String description;

	private String videoUrl;

	private RecipeRequestDTO recipe_Details;

	private List<IngredientsRequestDTO> list_Of_Ingredients;

	private List<RecipeStepsDTO> list_of_Steps;

	private Set<FoodCategoryDTO> set_of_categorys;
}
