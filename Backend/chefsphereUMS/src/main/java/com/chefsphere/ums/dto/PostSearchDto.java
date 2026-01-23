package com.chefsphere.ums.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostSearchDto {

	private String pid;
	
	@NotBlank
	private String postTitle;
	
	@NotBlank
	private String description;
	
	
	private String videoURL; 
	
	private String videoTag; 
	
}
