package com.chefsphere.ums.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.RatingRequestDto;
import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.exception_handler.BadRequestException;
import com.chefsphere.ums.exception_handler.InvalidIdException;
import com.chefsphere.ums.exception_handler.ResourceNotFoundException;
import com.chefsphere.ums.repository.PostRepo;
import com.chefsphere.ums.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class RatingServiceImpl {

	private final PostRepo postRepo;
	private final JwtUtils jwtUtils;

	// @Override
	public void newRating(RatingRequestDto c_dto, HttpServletRequest req) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		String uname = jwtUtils.extractUsername(token);

		// find creator by user id

		Post post = postRepo.findById(c_dto.getPostId())
		        .orElseThrow(() ->
		            new InvalidIdException("Post id " + c_dto.getPostId() + " doesnt exists")
		        );
		
		post.addRating(c_dto.getRating());
		postRepo.save(post);
	}

	// @Override
	public void deleteRatingById(Long postId) {

		Optional<Post> p = postRepo.findById(postId);
		if (p.isEmpty()) {
			throw new InvalidIdException("Post id " + postId + " doesnt exists");
		}
		if(p.get().getAvgRating()==0.0) {
			throw new BadRequestException("Post id "+postId+ " has no ratings yet");			
		}
		p.get().removeRating();
		postRepo.save(p.get());
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
	public Double findRatingByPostId(Long pid) {
		Optional<Post> p = postRepo.findById(pid);
		if (p.isEmpty()) {
			throw new ResourceNotFoundException("No post by id "+pid);
		}
		if(p.get().getAvgRating()==0.0) {
			throw new BadRequestException("Post has no ratings");			
		}
		return p.get().getAvgRating();
	}
}
