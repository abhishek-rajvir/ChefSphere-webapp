package com.chefsphere.ums.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.PostUpdateDTO;
import com.chefsphere.ums.dto.UserSignUpDto;
import com.chefsphere.ums.dto.UserUpdateDto;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.service.CreatorService;
import com.chefsphere.ums.service.FoodieService;
import com.chefsphere.ums.service.PostService;
import com.chefsphere.ums.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor // Creates a parameterized ctor having final & non null fields
@Validated
@Slf4j
//  abhir@example.com | Abhishek   | male   | Rajvir    | abhi123

// To handle logged user services 
public class AdminController {

	// dependencies

	// final is needed else will throw null pointer exception
	private final CreatorService creatorService;
	private final UserService userService;
	private final FoodieService foodieService;
	private final PostService postService;

	/*
	 * Admin endpoints
	 */

	@PostMapping("/new")
	public ResponseEntity<?> newAdmin(@Valid @RequestBody UserSignUpDto dto) {
		System.out.println(dto);
		User u = userService.createUser(0, dto);
		return ResponseEntity.ok("Admin " + u.getUsername() + " created successfully");
	}

	@GetMapping("/details")
	public ResponseEntity<?> getUserDetails(HttpServletRequest req) {
		return ResponseEntity.ok(userService.userDetails(req));
	}

	/*
	 * User endpoint
	 */

	@GetMapping("/user/{id}")
	public ResponseEntity<?> getUser(@PathVariable Long id) {
		return ResponseEntity.ok(userService.userDetails(id));
	}

	@PutMapping("/user/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateDto dto) {
		return ResponseEntity.ok(userService.updateUserDetails(id, dto));
	}

	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		// hard delete
		userService.deleteUserHard(id);
		return ResponseEntity.ok("User has been removed from database");
	}

	/*
	 * Creator endpoints
	 */
	@GetMapping("/creator/listAll")
	public ResponseEntity<?> listAllCreators() {
		return ResponseEntity.ok(creatorService.findAll());

	}

	@DeleteMapping("/creator/{id}")
	public ResponseEntity<?> deleteCreator(@PathVariable Long id) {
		Creator c = creatorService.findByIdWithPosts(id);
		String msg1 = postService.deletePost(c);
		String msg2 = userService.deleteCreator(id);
		return ResponseEntity.ok(msg1 + "\n" + msg2);
	}

	/*
	 * Foodie Endpoints
	 */
	@GetMapping("/listAll")
	public ResponseEntity<?> listAllFoodies() {
		return ResponseEntity.ok(foodieService.findAll());
	}

	@DeleteMapping("/foodie/{id}")
	public ResponseEntity<?> deleteFoodie(@PathVariable Long id) {
		String msg = userService.deleteFoodie(id);
		return ResponseEntity.ok(msg);
	}

	/*
	 * Post endpoints
	 */
	@PutMapping("/post/{post_id}")
	public ResponseEntity<?> editPost(@PathVariable Long post_id, @RequestBody PostUpdateDTO pDto) {
		postService.updatePostId(post_id, pDto);
		return ResponseEntity.ok("Post id: " + post_id + " updated succesfully..");
	}

	@DeleteMapping("/post/{post_id}")
	public ResponseEntity<?> deletePost(@PathVariable Long post_id) {
		postService.deleteById(post_id);
		return ResponseEntity.ok("Post id: " + post_id + " deleted succesfully..");
	}

}
