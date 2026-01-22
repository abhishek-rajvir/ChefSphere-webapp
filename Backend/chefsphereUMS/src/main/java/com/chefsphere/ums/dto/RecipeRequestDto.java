package com.chefsphere.ums.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecipeRequestDto {

	private String recipeName;
	
	private String description;
	
	private Integer prepTime;
	
	private Integer number_of_servings;
	
}
