package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class ResourceAlreadyExistsException extends RuntimeException {
	public ResourceAlreadyExistsException(String errMesg) {
		super(errMesg);
	}
}
