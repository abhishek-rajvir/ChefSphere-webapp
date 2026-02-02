package com.chefsphere.ums.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ApiResponseDTO<T> {

	private LocalDateTime timeStamp;
	private T data;
	private boolean status;// success | failed
	private String message;

	public ApiResponseDTO(T data, boolean status, String message) {
		this.timeStamp = LocalDateTime.now();
		this.data = data;
		this.status = status;
		this.message = message;
	}

}
