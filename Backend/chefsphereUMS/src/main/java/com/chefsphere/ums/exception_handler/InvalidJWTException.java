package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class InvalidJWTException extends RuntimeException {
	public InvalidJWTException(String message) {
		super(message);
	}
}
