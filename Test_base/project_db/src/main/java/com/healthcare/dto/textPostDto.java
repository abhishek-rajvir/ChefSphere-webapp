package com.healthcare.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class textPostDto {

	@NotBlank
	private String post_title;

	@NotBlank
	private String description;
	
	@NotBlank
	private String textContent;
	
	@JsonIgnore
	private String videoUrl = null;
}
