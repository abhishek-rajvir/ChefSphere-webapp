package com.chefsphere.ums.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.UserUpdateDto;
import com.chefsphere.ums.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor // Creates a parameterized ctor having final & non null fields
@Validated
@Slf4j
//  abhir@example.com | Abhishek   | male   | Rajvir    | abhi123

// To handle logged user services 
public class UserController {

	// dependencies
	
	// final is needed else will throw null pointer exception
	private final UserService userService;

	@GetMapping("/details")
	public ResponseEntity<?> getUserDetails(HttpServletRequest req)
	{		
		return ResponseEntity.ok(userService.userDetails(req));
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateUser(HttpServletRequest req,@Valid @RequestBody UserUpdateDto dto)
	{		
		return ResponseEntity.ok(userService.updateUserDetails(req,dto));	
	}

}
