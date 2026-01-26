package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class NoUniqueDataException extends RuntimeException {
	public NoUniqueDataException(String message) {
		super(message);
	}
}
