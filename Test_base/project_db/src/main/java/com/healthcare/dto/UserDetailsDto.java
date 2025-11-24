package com.healthcare.dto;

import com.healthcare.entities.UserType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDetailsDto {

	private String firstName;

	private String lastName;
	
	private String username;
	
	private String email;
	
	private UserType type;
	
	private String gender;
	
	private String token;

}
