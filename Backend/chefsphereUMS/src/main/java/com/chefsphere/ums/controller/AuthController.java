package com.chefsphere.ums.controller;

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

import com.chefsphere.ums.dto.AuthRequestDTO;
import com.chefsphere.ums.dto.AuthRespDTO;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.exception_handler.UserNameAlreadyExistsException;
import com.chefsphere.ums.security.JwtUtils;
import com.chefsphere.ums.security.UserPrincipal;
import com.chefsphere.ums.service.AuthService;
import com.chefsphere.ums.service.ImageKitServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor // Creates a parameterized ctor having final & non null fields
@Validated
@Slf4j
//  abhir@example.com | Abhishek   | male   | Rajvir    | abhi123

public class AuthController {

	// dependencies
	
	// final is need else will throw null pointer exception
	private final AuthenticationManager authenticationManager;
	private final AuthService authService;
	private final JwtUtils jwtUtils;
	private final ImageKitServiceImpl imageKitServiceImpl;

	@PostMapping("/signIn")
	@Operation(description = "User Authentication With Spring Security")
	public ResponseEntity<?> userSignIn(@RequestBody @Valid AuthRequestDTO request) {
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
		
		return ResponseEntity.ok(new AuthRespDTO(principal.getUserId(), principal.getNameOfUser(),jwtUtils.generateToken(principal), principal.getUserRole()));
	}

	@GetMapping("/checkUsername/{username}")
	public ResponseEntity<?> userNameExists(@PathVariable String username) {
		if (authService.userNameExist(username)) {
			throw new UserNameAlreadyExistsException("Username: "+username +" exists");
		} 
		return ResponseEntity.ok("Username: "+username+" doesn't exist");
	}

	@GetMapping("/checkEmail/{email}")
	public ResponseEntity<?> userEmailExists(@PathVariable String email) {
		if (authService.userEmailExist(email)) {
			throw new UserNameAlreadyExistsException("Email: "+email +" exists");
		} 
		return ResponseEntity.ok("Email: "+email+" doesn't exist");
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
		return ResponseEntity.ok(authService.encryptPasswords());
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
		User u = authService.findById(id);
		authService.encryptPassword(u);
		return ResponseEntity.ok("Encrypted password of User:"+u.getUsername());
	}
	
	@GetMapping("/imgkToken")
	public ResponseEntity<?> getImageKitToken(){
		return ResponseEntity.ok(imageKitServiceImpl.authenticate());
	}

}
