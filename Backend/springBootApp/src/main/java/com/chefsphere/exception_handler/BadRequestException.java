package com.chefsphere.exception_handler;

@SuppressWarnings("serial")
public class BadRequestException extends RuntimeException {
	public BadRequestException(String message) {
		super(message);
	}
}
