package com.chefsphere.ums.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class OtpRequestDto {

	@NotBlank(message = "Recipient email is required")
	@Email(message = "Recipient email must be valid")
	private String email;

}
