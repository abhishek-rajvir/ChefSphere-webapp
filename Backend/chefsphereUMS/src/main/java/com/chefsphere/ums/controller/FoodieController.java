package com.chefsphere.ums.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.UserSignUpDto;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.service.FoodieService;
import com.chefsphere.ums.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/foodies")
@AllArgsConstructor
public class FoodieController {

	// dependencies
	private final UserService userService;
	private final FoodieService foodieService;

	@GetMapping("/{id}")
	public ResponseEntity<?> findFoodieById(@PathVariable Long id) {
		return ResponseEntity.ok(foodieService.findByIdDto(id));
	}

	@GetMapping("/listAll")
	public ResponseEntity<?> listAll() {
		return ResponseEntity.ok(foodieService.findAll());
	}

	@PostMapping("/signUp")
	public ResponseEntity<?> newFoodie(@Valid @RequestBody UserSignUpDto dto) {
		// create new user
		User u = userService.createUser(2, dto);
		return ResponseEntity.ok(foodieService.createFoodie(u));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteFoodie(HttpServletRequest req) {
		String msg = userService.deleteFoodie(req);
		return ResponseEntity.ok(msg);
	}

}
