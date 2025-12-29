package com.chefsphere.exception_handler;

@SuppressWarnings("serial")
public class AuthenticationException extends RuntimeException {
	public AuthenticationException(String errMesg) {
		super(errMesg);
	}
}
