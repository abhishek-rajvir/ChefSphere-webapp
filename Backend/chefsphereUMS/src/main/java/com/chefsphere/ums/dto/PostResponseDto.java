package com.chefsphere.ums.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostResponseDto {

	private String pid;
	
	private String creatorName;
	
	private String postTitle;
	
	private String description;
	
	private String videoURL; 
	
	private String videoTag; 
	
	private RecipeRequestDto recipe_Details;
	
	private List<IngredientsRequestDto> list_Of_Ingredients;

	private List<RecipeStepsDto> list_of_Steps;
	
	private List<FoodCategoryDto> list_of_categorys;
	
	private List<CommentResponseDto> list_of_comments;
	
	private Double rating;
}
