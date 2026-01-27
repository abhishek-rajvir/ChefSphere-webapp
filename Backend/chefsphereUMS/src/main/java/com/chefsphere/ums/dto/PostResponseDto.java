package com.chefsphere.ums.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostResponseDTO {

	private Long pid;
	
	private String creatorName;
	
	private Long cid;
	
	private String postTitle;
	
	private String description;
	
	private String videoURL; 
	
	private String videoTag; 
	
	private RecipeRequestDTO recipe_Details;
	
	private List<IngredientsRequestDTO> list_Of_Ingredients;

	private List<RecipeStepsDTO> list_of_Steps;
	
	private List<FoodCategoryDTO> list_of_categorys;
	
	private List<CommentResponseDTO> list_of_comments;
	
	private Double rating;
}
