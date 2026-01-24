package com.chefsphere.ums.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.CommentRequestDto;
import com.chefsphere.ums.dto.RatingRequestDto;
import com.chefsphere.ums.service.CommentServiceImpl;
import com.chefsphere.ums.service.RatingServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/engagement")
@RequiredArgsConstructor
public class EngagementController {

	private final CommentServiceImpl commentService;
	private final RatingServiceImpl ratingServiceImpl;

	@PostMapping("/comment/new")
	public ResponseEntity<?> createComment(HttpServletRequest req, @Valid @RequestBody CommentRequestDto cDto) {
		commentService.createComment(cDto, req);
		return ResponseEntity.ok("Comment created succesfully ");
	}

	@DeleteMapping("/comment/{comment_id}/delete")
	public ResponseEntity<?> deleteComment(@PathVariable Long comment_id) {
		commentService.deleteCommentById(comment_id);
		return ResponseEntity.ok("Comment id: " + comment_id + " deleted succesfully..");
	}

	// get list of all comments under a post
	@GetMapping("/comment/{post_id}/listAll")
	public ResponseEntity<?> findAllComments(@PathVariable Long post_id) {
		return ResponseEntity.ok(commentService.findAllCommentByPostId(post_id));
	}

	@PostMapping("/rating/new")
	public ResponseEntity<?> createRating(HttpServletRequest req,@Valid @RequestBody RatingRequestDto rDto) {
		ratingServiceImpl.newRating(rDto, req);
		return ResponseEntity.ok("Rating created succesfully ");
	}

	@DeleteMapping("/rating/{post_id}/delete")
	public ResponseEntity<?> deleteRating(@PathVariable Long post_id) {
		System.out.println("in new rating//");
		ratingServiceImpl.deleteRatingById(post_id);
		return ResponseEntity.ok("Rating id: " + post_id + " deleted succesfully..");
	}

	// get list of all comments under a post
	@GetMapping("/rating/{post_id}")
	public ResponseEntity<?> findAllRatings(@PathVariable Long post_id) {
		return ResponseEntity.ok(ratingServiceImpl.findAllRatingByPostId(post_id));
	}

}
