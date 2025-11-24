package com.healthcare.exception_handler;

public class ResourceAlreadyExistsException extends RuntimeException {
	public ResourceAlreadyExistsException(String errMesg) {
		super(errMesg);
	}
}
