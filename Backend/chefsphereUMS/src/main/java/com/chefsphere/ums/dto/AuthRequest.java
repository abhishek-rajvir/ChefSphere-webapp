package com.chefsphere.ums.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@RequiredArgsConstructor
public class AuthRequest {
	@NotBlank(message = "Email is required!")
	@Email(message = "Invalid Email Format")
	private String email;
	@NotBlank(message = "Password is required!")
	private String password;
}
