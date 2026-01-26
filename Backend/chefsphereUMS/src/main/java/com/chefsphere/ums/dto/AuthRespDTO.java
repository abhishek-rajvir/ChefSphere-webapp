package com.chefsphere.ums.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

// (user id ,name, email , role , message)
@Getter
@Setter
@AllArgsConstructor
public class AuthRespDTO {
	private String id;
	private String username;
	private String token;
	private String type;
}
