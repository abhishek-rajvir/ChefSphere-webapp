package com.chefsphere.ums.controller;

import com.chefsphere.ums.dto.UserSignUpDto;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.service.CreatorService;
import com.chefsphere.ums.service.PostService;
import com.chefsphere.ums.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/creators")
@AllArgsConstructor

public class CreatorController {

	// dependencies
	private final PostService postService;
	private final UserService userService;
	private final CreatorService creatorService;

	@GetMapping("/{id}")
	public ResponseEntity<?> findCreatorById(@PathVariable Long id) {
		return ResponseEntity.ok(creatorService.findById(id));
	}

	@GetMapping("/listAll")
	public ResponseEntity<?> listAll() {
		return ResponseEntity.ok(creatorService.findAll());

	}

	@PostMapping("/signUp")
	public ResponseEntity<?> newCreator(@Valid @RequestBody UserSignUpDto dto) {
		// create new user
		User u = userService.createUser(1, dto);
		return ResponseEntity.ok(creatorService.createCreator(u));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteCreator(HttpServletRequest req) {
		Creator c = creatorService.findByIdWithPosts(req);
		String msg1 = postService.deletePost(c);
		String msg2 = userService.deleteCreator(req);
		return ResponseEntity.ok( msg1 + "\n" + msg2 );
	}

	@GetMapping("/list/creatorRange/{qty}")
	public ResponseEntity<?> findCreatorByRange(@PathVariable Long qty) {
		return ResponseEntity.ok(creatorService.findRandomCreatorByQty(qty));
	}

}
