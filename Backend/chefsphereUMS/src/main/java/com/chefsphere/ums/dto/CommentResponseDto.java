package com.chefsphere.ums.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class CommentResponseDTO {
	
	private Long commentId;
	
	private String authorName;

	private String message;

	private Long postId;
}
