package com.healthcare.exception_handler;

public class InvalidDetailsException extends RuntimeException {
	public InvalidDetailsException(String message) {
		super(message);
	}
}
