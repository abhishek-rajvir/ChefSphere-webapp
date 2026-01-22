package com.chefsphere.ums.dto;

import java.time.LocalDate;

import com.chefsphere.ums.entities.UserType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
	private Long id;	
	private String firstName;
	private String lastName;
	private LocalDate dob;
	private UserType userRole;
	private int regAmount;
	public UserDTO(String firstName, String lastName, LocalDate dob) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
	}
	
}
