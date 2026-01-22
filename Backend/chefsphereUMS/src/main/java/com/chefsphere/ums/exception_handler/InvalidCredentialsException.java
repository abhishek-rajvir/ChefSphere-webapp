package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class InvalidCredentialsException extends RuntimeException {
	public InvalidCredentialsException(String message) {
		super(message);
	}
}
