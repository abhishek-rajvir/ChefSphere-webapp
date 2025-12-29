package com.chefsphere.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecipeRequestDto {

	private String recipeName;
	
	private String description;
	
	private Integer prep_time;
	
	private Integer number_of_servings;
	
}
