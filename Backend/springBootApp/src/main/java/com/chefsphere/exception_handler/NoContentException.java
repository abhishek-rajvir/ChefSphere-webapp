package com.chefsphere.exception_handler;

@SuppressWarnings("serial")
public class NoContentException extends RuntimeException {
	public NoContentException(String message) {
		super(message);
	}
}
