package com.chefsphere.exception_handler;

@SuppressWarnings("serial")
public class ResourceNotFoundException extends RuntimeException {
	public ResourceNotFoundException(String message) {
		super(message);
	}
}
