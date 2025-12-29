package com.chefsphere.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostResponseDto {

	@NotBlank
	private String post_title;
	
	@NotBlank
	private String description;
	
//	@JsonIgnore
//	private String textContent = null;
//	
	@NotBlank
	private String videoTag; 
	
	private RecipeRequestDto recipe_Details;
	
	
	private List<IngredientsRequestDto> list_Of_Ingredients;

	private List<RecipeStepsDto> list_of_Steps;
	
	private List<FoodCategoryDto> list_of_categorys;
}
