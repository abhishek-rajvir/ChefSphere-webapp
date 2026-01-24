package com.chefsphere.ums.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class CommentRequestDto {

	@NotBlank(message = "Foodie name is required")
	@Size(min = 5, max = 1000, message = "message content must be between 5 and 1000 characters")
	private String message;

	@NotNull(message = "foodie id is required")
	@Positive(message = "foodie id must be greater than 0")
	private Long postId;
}
