package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class InvalidFilterException extends RuntimeException {
	public InvalidFilterException(String message) {
		super(message);
	}
}
