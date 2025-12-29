package com.chefsphere.exception_handler;

@SuppressWarnings("serial")
public class InvalidDetailsException extends RuntimeException {
	public InvalidDetailsException(String message) {
		super(message);
	}
}
