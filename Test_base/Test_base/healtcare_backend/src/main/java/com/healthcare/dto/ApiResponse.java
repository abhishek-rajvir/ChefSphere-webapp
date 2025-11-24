package com.healthcare.dto;

import java.time.LocalDateTime;

import org.hibernate.annotations.CurrentTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApiResponse<T> {
	
	@CurrentTimestamp
	private LocalDateTime timeStamp;
	private T data;
	private boolean status;// success | failed
	private String message;
	
}
