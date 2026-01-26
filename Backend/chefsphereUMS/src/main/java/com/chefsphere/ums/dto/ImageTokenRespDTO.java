package com.chefsphere.ums.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ImageTokenRespDTO {
	private String token;
	private String expire;
	private String signature;
}
