package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.CommentRequestDTO;
import com.chefsphere.ums.dto.CommentResponseDTO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface CommentService {

	void createComment(CommentRequestDTO c_dto, HttpServletRequest req) ;
	void createCommentAuthor(CommentRequestDTO c_dto, HttpServletRequest req) ;
	void deleteCommentById(Long commentId) ;

	List<CommentResponseDTO> findAllCommentByPostId(Long pid) ;
}