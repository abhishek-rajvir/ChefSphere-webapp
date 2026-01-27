package com.chefsphere.ums.dto;

import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PostRequestDTO {

	@NotBlank
	private String postTitle;
	
	@NotBlank
	private String description;
	
	@NotBlank
	private String videoUrl; 
	
//	@NotBlank
	// recipe dto
	private RecipeRequestDTO recipe_Details;
	
//	@NotBlank
	// ing dto
	private List<IngredientsRequestDTO> list_Of_Ingredients;
	
//	@NotBlank
	// rec steps dto
	private List<RecipeStepsDTO> list_of_Steps;
	
	// category dto
	private Set<FoodCategoryDTO> set_of_categorys;
}
