package com.chefsphere.exception_handler;

@SuppressWarnings("serial")
public class InvalidCredentialsException extends RuntimeException {
	public InvalidCredentialsException(String message) {
		super(message);
	}
}
