package com.chefsphere.ums.dto;

import org.hibernate.validator.constraints.Range;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor		
public class RatingRequestDTO {
	
	@NotNull(message = "Stars are required")
	@Range(min = 1, max = 5, message = "Stars must be between 1 and 5")
	private Integer rating;

	@NotNull(message = "Post id is required")
	@Positive(message = "Post id must be greater than 0")
	private Long postId;
	
}
