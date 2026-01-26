package com.chefsphere.ums.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostSearchDTO {

	private String pid;
	
	@NotBlank
	private String postTitle;
	
	@NotBlank
	private String description;
	
	
	private String videoURL; 
	
	private String videoTag; 
	
}
