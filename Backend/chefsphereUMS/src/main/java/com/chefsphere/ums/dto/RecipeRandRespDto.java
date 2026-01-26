package com.chefsphere.ums.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecipeRandRespDTO {

	private Long pid;
	
	private Long recipeId;

	private String recipeName;

	private String description;

	private String videoUrl;

}
