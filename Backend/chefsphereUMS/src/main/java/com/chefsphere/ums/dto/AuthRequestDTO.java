package com.chefsphere.ums.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class AuthRequestDTO {
	@NotBlank(message = "Email is required!")
	@Email(message = "Invalid Email Format")
	private String email;
	@NotBlank(message = "Password is required!")
	private String password;
}
