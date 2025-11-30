package com.healthcare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.healthcare.dto.PostRequestDto;
import com.healthcare.service.PostServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
	
	private final PostServiceImpl postService;
	
	@PostMapping("/new")
	public ResponseEntity<?> createPost(@Valid @RequestBody PostRequestDto vdto,HttpServletRequest req){
		
		postService.createPost(vdto,req);
		return ResponseEntity.ok("Post succesfully created");
	}
	
	@DeleteMapping("/{post_id}/delete")
	public ResponseEntity<?> deletePost(@PathVariable Long post_id, HttpServletRequest req){
		postService.deleteById(post_id,req);
		return ResponseEntity.ok("Post id: "+post_id+" deleted succesfully..");
	}
	
	/*
	 *  Getters
	 */
	
	// find user post by post number selected
	@GetMapping("/{post_id}")
	public ResponseEntity<?> findAllUserPostByNo(@PathVariable Long post_no, HttpServletRequest req){
		return ResponseEntity.ok(postService.findByUserIdAndPostNo(post_no,req));
	}
	
	// get list of all post of User
	@GetMapping("/list")
	public ResponseEntity<?> findAllUserPosts(@PathVariable Long post_id, HttpServletRequest req){
		return ResponseEntity.ok(postService.findAllByUserId(req));
	} 
	
	// get list of all post in the database
	@GetMapping("/listAll")
	public ResponseEntity<?> findAllPostInDatabase(){
		return ResponseEntity.ok(postService.findAllPosts());
	} 
	
}
