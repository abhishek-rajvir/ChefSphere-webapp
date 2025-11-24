package com.healthcare.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

// (user id ,name, email , role , message)
@Getter
@Setter
@AllArgsConstructor
public class AuthResp {
	private String jwt;
	private String message;
}
