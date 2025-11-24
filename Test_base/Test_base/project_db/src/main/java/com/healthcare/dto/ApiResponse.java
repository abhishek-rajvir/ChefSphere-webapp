package com.healthcare.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse<T> {

	private LocalDateTime timeStamp;
	private T data;
	private boolean status;// success | failed
	private String message;
	public ApiResponse(T data, boolean status, String message) {
		this.timeStamp = LocalDateTime.now();
		this.data = data;
		this.status = status;
		this.message = message;
	}
	
	
	
}
