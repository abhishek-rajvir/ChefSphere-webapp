package com.chefsphere.ums.dto;

import com.chefsphere.ums.entities.UserType;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodieUpdateDto {

	private String firstName;
	
	private String lastName;

	private String username;
	
	@Email(message = "Invalid email format")
	private String email;
	
	private String password;
	
	private UserType type;
	
	private String gender;
	
}
