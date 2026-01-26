package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class UserNameAlreadyExistsException extends RuntimeException {
	public UserNameAlreadyExistsException(String errMesg) {
		super(errMesg);
	}
}
