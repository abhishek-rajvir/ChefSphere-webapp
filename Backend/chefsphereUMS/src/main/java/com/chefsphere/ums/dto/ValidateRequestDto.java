package com.chefsphere.ums.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
@AllArgsConstructor
public class ValidateRequestDto {

	@NotBlank(message = "Recipient email is required")
	@Email(message = "Recipient email must be valid")
	private String email;

    @NotBlank(message = "Password cannot be blank00003")
    private String password;

    @NotBlank(message = "OTP is required")
    @Pattern(regexp = "^[0-9]{6}$", message = "OTP must be exactly 6 digits")
    private String otp;

}
