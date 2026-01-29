package com.chefsphere.ums.dto;

import com.chefsphere.ums.entities.UserType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserResponseDTO {

	private Long id;
	
	private String firstName;

	private String lastName;
	
	private String username;
	
	private String email;
	
	private UserType type;
	
	private String gender;
	
	private String description;
	
	private String token;

}
