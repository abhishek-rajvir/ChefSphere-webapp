package com.chefsphere.ums.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.CommentRequestDTO;
import com.chefsphere.ums.dto.RatingRequestDTO;
import com.chefsphere.ums.service.CommentService;
import com.chefsphere.ums.service.FollowService;
import com.chefsphere.ums.service.RatingService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/engagement")
@RequiredArgsConstructor
public class EngagementController {

	private final CommentService commentService;
	private final RatingService ratingService;
	private final FollowService followService;

	/*
	 * Comment endpoints
	 */
	@PostMapping("/comment/new")
	public ResponseEntity<?> createComment(HttpServletRequest req, @Valid @RequestBody CommentRequestDTO cDto) {
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

	/*
	 * Rating endpoints
	 */
	@PostMapping("/rating/new")
	public ResponseEntity<?> createRating(@Valid @RequestBody RatingRequestDTO rDto) {
		ratingService.newRating(rDto);
		return ResponseEntity.ok("Rating created succesfully ");
	}

	@DeleteMapping("/rating/{post_id}/delete")
	public ResponseEntity<?> deleteRating(@PathVariable Long post_id) {
		System.out.println("in new rating//");
		ratingService.deleteRatingById(post_id);
		return ResponseEntity.ok("Rating id: " + post_id + " deleted succesfully..");
	}

	// get list of all comments under a post
	@GetMapping("/rating/{post_id}")
	public ResponseEntity<?> findAllRatings(@PathVariable Long post_id) {
		return ResponseEntity.ok(ratingService.findRatingByPostId(post_id));
	}

	/*
	 * Follow endpoints
	 */
	@GetMapping("/follow/allFollowers")
	public ResponseEntity<?> getFollowers(HttpServletRequest req) {
		return ResponseEntity.ok(Map.of("foodies", followService.getFollowers(req)));
	}

	@GetMapping("/follow/{creator_id}/totalfollowers")
	public ResponseEntity<Map<String, Long>> allFollowersCreator(@PathVariable("creator_id") Long cid) {

		return ResponseEntity.ok(Map.of("followers", followService.totalFollowers(cid)));
	}

	@GetMapping("/follow/allFollowing")
	public ResponseEntity<?> allfollowingFoodie(HttpServletRequest req) {
		return ResponseEntity.ok(followService.allFollowing(req));
	}

	@PostMapping("/follow/followCreator/{creator_id}")
	public ResponseEntity<?> followCreator(HttpServletRequest req, @PathVariable Long creator_id) {
		System.out.println("In follow creator");
		long fid = followService.followCreator(req, creator_id);

		return ResponseEntity.ok("Foodie: " + fid + " now follows Creator: " + creator_id);

	}

	@DeleteMapping("/follow/unFollowCreator/{creator_id}")
	public ResponseEntity<?> unfollowCreator(HttpServletRequest req, @PathVariable Long creator_id) {
		System.out.println("In unfollow creator");
		long fid = followService.unfollowCreator(req, creator_id);
		return ResponseEntity.ok("Foodie: " + fid + " has unfollowed Creator: " + creator_id);
	}

	@GetMapping("/follow/doesFollow/{creator_id}")
	public ResponseEntity<?> whetherfollowCreator(HttpServletRequest req, @PathVariable Long creator_id) {
		long fid = followService.whetherfollowCreator(req, creator_id);
		return ResponseEntity.ok("Foodie: " + fid + " does follow Creator: " + creator_id);
	}

}
