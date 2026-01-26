package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(String message) {
		super(message);
	}
}
