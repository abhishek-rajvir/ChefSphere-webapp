package com.chefsphere.exception_handler;

@SuppressWarnings("serial")
public class InvalidIdException extends RuntimeException {
	public InvalidIdException(String message) {
		super(message);
	}
}
