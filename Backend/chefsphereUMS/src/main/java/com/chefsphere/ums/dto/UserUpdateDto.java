package com.chefsphere.ums.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDto {
	
	private String firstName;

	private String lastName;
	
	private String username;
	
	@Email(message = "Invalid email format")
	private String email;
	
	private String password;
	
	private String gender;
	
	// will allow empty email without validation as null are skipped 
	public void setEmail(String email) {
	    if (email != null && !email.isBlank()) {
	        this.email = null;
	    } else {
	        this.email = email;
	    }
	}
	
}
