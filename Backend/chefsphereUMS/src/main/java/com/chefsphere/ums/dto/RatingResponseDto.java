package com.chefsphere.ums.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor		
public class RatingResponseDto {

	private Long ratingId;
	
	private String foodieName;
	
	private Integer rating;

	private Long postId;
	
}

