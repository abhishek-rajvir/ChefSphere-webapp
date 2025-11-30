package com.healthcare.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dto.UserLoginDto;
import com.healthcare.security.JwtUtils;
import com.healthcare.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("users")
@AllArgsConstructor

//  abhir@example.com | Abhishek   | male   | Rajvir    | abhi123

public class UserController /*~~(Could not parse as Java)~~>*/{
	
	// dependencies		
	private final AuthenticationManager authenticationManager;
	private JwtUtils jwtUtils;
	
	private final UserService serviceImpl;
	
	@PostMapping("/signIn")
	public ResponseEntity<?> login(@Valid @RequestBody UserLoginDto dto){
		
				System.out.println("in user auth "+dto);
				//1 . Invoke the method of Spring Supplied AuthManager
				/* AuthenticationManager - i/f , Method
				 * public Authentication authenticate(Authentication auth) throws AuthenticationException
				 * Authentication - i/f
				 * Implemented by - UsernamePasswordAuthenticationToken(String email,String password)
				 * i/p - not yet verified (isAuth : false)
				 * o/p - Fully Authenticated UserDetails - email|username , password-null , Collection<GrantedAuthority> , isAuth : true
				 */
				
				//2. To invoke the method on AuthMgr - first configure AuthMgr as bean(@Bean)
				// & then add it as the depcy
				
				  //3. In case of success, create JWT send it to the REST Client (using JWT Utils - helper class)
					
					return ResponseEntity.status(HttpStatus.CREATED)
							.body(serviceImpl.signIn(dto));
				
//		
//		return ResponseEntity.ok(serviceImpl.signIn(dto.getEmail(), dto.getPassword()));				
		
	}
	
}
