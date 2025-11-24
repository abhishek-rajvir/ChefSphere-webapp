package com.healthcare.dto;

import com.healthcare.entities.UserType;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatorUpdateDto {

	private String firstName;
	
	private String lastName;

	private String username;
	
	@Email(message = "Invalid email format")
	private String email;
	
	private String password;
	
	private UserType type;
	
	private String gender;
	
}
