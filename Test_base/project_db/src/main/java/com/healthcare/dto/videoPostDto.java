package com.healthcare.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class videoPostDto {

	@NotBlank
	private String post_title;
	
	@NotBlank
	private String description;
	
	@JsonIgnore
	private String textContent = null;
	
	@NotBlank
	private String videoUrl; 
}
