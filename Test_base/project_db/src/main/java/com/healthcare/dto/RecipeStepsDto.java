package com.healthcare.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecipeStepsDto {

	private Long step_no;
	
	private String step_name;

	private String Content;
	
	// not compulsory
	@JsonIgnore
	private String img_url;
	
}
