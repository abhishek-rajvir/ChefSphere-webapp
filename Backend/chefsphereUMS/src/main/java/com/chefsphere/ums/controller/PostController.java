package com.chefsphere.ums.controller;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.PostRequestDto;
import com.chefsphere.ums.service.PostServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

	private final PostServiceImpl postService;
//	private final PostRepo postRepo;

	@PostMapping("/new")
	public ResponseEntity<?> createPost(@Valid @RequestBody PostRequestDto vdto, HttpServletRequest req) {

		postService.createPost(vdto, req);
		return ResponseEntity.ok("Post succesfully created");
	}

	@DeleteMapping("/{post_id}/delete")
	public ResponseEntity<?> deletePost(@PathVariable Long post_id, HttpServletRequest req) {
		postService.deleteById(post_id, req);
		return ResponseEntity.ok("Post id: " + post_id + " deleted succesfully..");
	}

	@PutMapping("/{post_id}/update")
	public ResponseEntity<?> editPost(@PathVariable Long post_id, @RequestBody PostRequestDto pDto,
			HttpServletRequest req) {
		System.out.println("In user/post/{id}/edit");
		postService.updatePostId(post_id, pDto, req);
		return ResponseEntity.ok("Post id: " + post_id + " updated succesfully..");
	}

	/*
	 * Getters
	 */

	// find user post by post number selected
	@GetMapping("/{post_no}")
	public ResponseEntity<?> findUserPostByNo(@PathVariable Long post_no) {
		return ResponseEntity.ok(postService.findByPostNo(post_no));
	}
//	public ResponseEntity<?> findUserPostByNo(@PathVariable Long post_no, HttpServletRequest req){
	// if id is 1 converted to 0 for indexing
//		return ResponseEntity.ok(postService.findByUserIdAndPostNo(post_no-1,req));

	// findAll post by name
	@GetMapping("/search/title")
	public ResponseEntity<?> findAllByPostTitle(@RequestParam String title) {
		String decoded = URLDecoder.decode(title, StandardCharsets.UTF_8);
		return ResponseEntity.ok(postService.findAllByPostTitle(decoded));
	}

	
	// findAll post by category
	@GetMapping("/search/category")
	public ResponseEntity<?> findUserPostByCategory(@RequestParam String categoryName) {
		System.out.println(categoryName);
		return ResponseEntity.ok(postService.findAllByCategory(categoryName));
	}

	// findAll post by ingredient
	@GetMapping("/{post_no}/ingredient")
	public ResponseEntity<?> findUserPostByIngredient(@RequestParam String ingredient) {
		return ResponseEntity.ok(postService.findAllByIngredient(ingredient));
	}

	// findAll post by duration
	@GetMapping("/{post_no}/duration")
	public ResponseEntity<?> findUserPostByDuration(@RequestParam Long prep_time, @RequestParam Integer range) {
		return ResponseEntity.ok(postService.findAllByDuration(prep_time, range));
	}

	// random recipe in range
	@GetMapping("/list/recipeRange/{qty}")
	public ResponseEntity<?> findRecipeByRange(@PathVariable Integer qty) {
		return ResponseEntity.ok(postService.findRandomRecipeByQty(qty));
	}

	// get list of all post of provided creator id
	@GetMapping("/list")
	public ResponseEntity<?> findAllUserPosts(HttpServletRequest req) {
		System.out.println("in user/post/list ");
		return ResponseEntity.ok(postService.findAllByUserId(req));
	}

	// get list of all post of current logged creator
	@GetMapping("{creator_id}/list")
	public ResponseEntity<?> findAllUserPosts(@PathVariable Long creator_id) {
		System.out.println("in user/post/{param}/list ");
		return ResponseEntity.ok(postService.findAllByUserId(creator_id));
	}

	// get list of all post in the database
	@GetMapping("/listAll")
	public ResponseEntity<?> findAllPostInDatabase() {
//		return ResponseEntity.ok(postRepo.findAll().get(1);
		return ResponseEntity.ok(postService.findAllPosts());
	}
	
	// get list of all categories
	@GetMapping("/listAll/categories")
	public ResponseEntity<?> findAllCategories() {
		return ResponseEntity.ok(postService.findAllCategories());
	}
	
	// random recipe in range
	@GetMapping("/list/categoryRange/{qty}")
	public ResponseEntity<?> findRandomCategoriesByRange(@PathVariable Long qty) {
		return ResponseEntity.ok(postService.findRandomCategoriesByQty(qty));
	}
}
