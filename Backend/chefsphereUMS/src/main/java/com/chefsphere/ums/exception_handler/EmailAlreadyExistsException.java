package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class EmailAlreadyExistsException extends RuntimeException {
	public EmailAlreadyExistsException(String errMesg) {
		super(errMesg);
	}
}
