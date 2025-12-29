package com.chefsphere.dto;

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
public class PostRequestDto {

	@NotBlank
	private String post_title;
	
	@NotBlank
	private String description;
	
//	@JsonIgnore
//	private String textContent = null;
//	
	@NotBlank
	private String videoUrl; 
	
//	@NotBlank
	// recipe dto
	private RecipeRequestDto recipe_Details;
	
//	@NotBlank
	// ing dto
	private List<IngredientsRequestDto> list_Of_Ingredients;
	
//	@NotBlank
	// rec steps dto
	private List<RecipeStepsDto> list_of_Steps;
	
	// category dto
	private Set<FoodCategoryDto> set_of_categorys;
}
