package com.chefsphere.ums.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.CommentRequestDto;
import com.chefsphere.ums.dto.CommentResponseDto;
import com.chefsphere.ums.entities.Comment;
import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.exception_handler.InvalidIdException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.repository.CommentRepo;
import com.chefsphere.ums.repository.PostRepo;
import com.chefsphere.ums.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CommentServiceImpl {

	private final PostRepo postRepo;
	private final CommentRepo commentRepo;
	private final JwtUtils jwtUtils;
	private final ModelMapper mapper;

	// @Override
	public void createComment(CommentRequestDto c_dto, HttpServletRequest req) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		String uname = jwtUtils.extractUsername(token);

		// find creator by user id

		Optional<Post> p = postRepo.findById(c_dto.getPostId());

		if (p.isEmpty()) {
			throw new InvalidIdException("Post id " + c_dto.getPostId() + " doesnt exists");
		}
		Comment newComment = mapper.map(c_dto, Comment.class);

		newComment.setPost(p.get());
		newComment.setFoodieName(uname);

		Comment persistentComment = commentRepo.save(newComment);

		p.get().addComment(persistentComment);
		postRepo.save(p.get());

	}

	// @Override
	public void deleteCommentById(Long commentId) {

		Optional<Comment> c = commentRepo.findById(commentId);
		if (c.isEmpty()) {
			throw new InvalidIdException("Comment id " + commentId + " doesnt exists");
		}
		Post p = c.get().getPost();
		p.removeComment(c.get());
		postRepo.save(p);
		commentRepo.delete(c.get());

	}

//	// @Override
//	public void updateComment(CommentUpdateDto c_dto, HttpServletRequest req) {
//
//		// post basic validation
//		int len = c_dto.getMessage().length();
//		// get token
//		String token = jwtUtils.extractToken(req);
//
//		// get user id
//		Long Userid = jwtUtils.extractUserId(token);
//
//		// find creator by user id
//		Foodie f = foodieService.findByUserIdWithComments(Userid);
//
//		Optional<Comment> c = commentRepo.findById(c_dto.getCommentId());
//		if (c.isPresent()) {
//
//			f.addComment(c.get());
//			foodieRepo.save(f);
//		}
//	}

	// @Override
	public List<CommentResponseDto> findAllCommentByPostId(Long pid) {
		List<Comment> comList = commentRepo.findByPostId(pid);
		if (comList.isEmpty() || comList == null) {
			throw new NoContentException("Post has no comments");
		}
		return comList.stream().map(c -> {
			CommentResponseDto cdto = mapper.map(c, CommentResponseDto.class);
			cdto.setPostId(pid);
			return cdto;
		}).toList();
	}
}
