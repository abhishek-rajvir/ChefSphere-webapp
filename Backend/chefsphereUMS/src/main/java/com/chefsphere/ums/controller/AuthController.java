package com.chefsphere.ums.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.AuthRequest;
import com.chefsphere.ums.dto.AuthResp;
import com.chefsphere.ums.dto.UserDTO;
import com.chefsphere.ums.security.JwtUtils;
import com.chefsphere.ums.security.UserPrincipal;
import com.chefsphere.ums.service.ImageKitServiceImpl;
import com.chefsphere.ums.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor // Creates a parameterized ctor having final & non null fields
@Validated
@Slf4j
//  abhir@example.com | Abhishek   | male   | Rajvir    | abhi123

public class AuthController {

	// dependencies
	
	// final is need else will throw null pointer exception
	private final AuthenticationManager authenticationManager;
	private final UserService userService;
	private final JwtUtils jwtUtils;
	private final ImageKitServiceImpl imageKitServiceImpl;

	// * 1. Get All Users (get resource - readonly)
	// URI (path) - /users
	// Method - GET
	// Payload - none
	// Resp - SC 200 + List<UserDTO> - if list is not empty
	// user details - user id , name , dob , role , reg amount
	// In case of empty list - SC 204 , no body
	// */
	@GetMapping
	public /* @ResponseBody */ ResponseEntity<?> renderUserList() {
		System.out.println("in render user list");
		List<UserDTO> list = userService.getAllUsers();
		if (list.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // only status code : 204
		// => non empty body
		return ResponseEntity.ok(list); // SC 200 + List -> Json[]
	}

	@PostMapping("/signIn")
	@Operation(description = "User Authentication With Spring Security")
	public ResponseEntity<?> userSignIn(@RequestBody @Valid AuthRequest request) {
		System.out.println("in user sign in " + request);
		/*
		 * 1. Create Authentication object (UsernamePasswordAuthToken) to store - email
		 * & password
		 */
		Authentication holder = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
		log.info("*****Before -  is authenticated {}", holder.isAuthenticated());// false
		/*
		 * Call AuthenticationMgr's authenticate method
		 */
		Authentication fullyAuth = authenticationManager.authenticate(holder);
		// => authentication success -> create JWT
		log.info("*****After -  is authenticated {}", fullyAuth.isAuthenticated());// true
		log.info("**** auth {} ", fullyAuth);// principal : user details , null : pwd , Collection<GrantedAuth>
		log.info("***** class of principal {}", fullyAuth.getPrincipal().getClass());// com.healthcare.security.UserPrincipal
		// downcast Object -> UserPrincipal
		UserPrincipal principal = (UserPrincipal) fullyAuth.getPrincipal();
		// 3. In case of success, create JWT send it to the REST Client (using JWT Utils
		// - helper class)
		
		return ResponseEntity.ok(new AuthResp(principal.getUserId(), principal.getNameOfUser(),jwtUtils.generateToken(principal), principal.getUserRole()));
	}

	@GetMapping("/{username}")
	public ResponseEntity<?> userExists(@PathVariable String username) {
		if (userService.existsByUsername(username)) {
			return ResponseEntity.ok("Username doesn't exists");
		} else {
			return ResponseEntity.badRequest().body("Username already exists");
		}

	}

	/*
	 * Encrypt Password of all users o/p -ApiResp (encrypted!) DB Action - store
	 * encrypted password in the DB URL -http://host:port/users/pwd-encryption
	 * Method - PATCH
	 */
	@PostMapping("/pwd-encryption")
	@Operation(description = "Encrypt Password of all users")
	public ResponseEntity<?> encryptUserPassword() {
		log.info("encrypting users password ");
		// invoke service layer method
		return ResponseEntity.ok(userService.encryptPasswords());

	}
	

	/*
	 * Encrypt Password of all users o/p -ApiResp (encrypted!) DB Action - store
	 * encrypted password in the DB URL -http://host:port/users/pwd-encryption
	 * Method - PATCH
	 */
	@PatchMapping("/pwd-encryption/{id}")
	@Operation(description = "Encrypt Password of all users")
	public ResponseEntity<?> encryptUserPassword(@PathVariable Long id) {
		log.info("encrypting users password ");
		// invoke service layer method
		return ResponseEntity.ok(userService.encryptPassword(id));

	}
	
	@GetMapping("/imgkToken")
	public ResponseEntity<?> getImageKitToken(){
		return ResponseEntity.ok(imageKitServiceImpl.authenticate());
	}

}
