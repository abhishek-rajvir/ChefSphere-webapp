package com.healthcare.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostResponseDto {
	private Long post_id;
	
	private String post_title;
	
	private String description;
	
	private String videoTag;	
}
