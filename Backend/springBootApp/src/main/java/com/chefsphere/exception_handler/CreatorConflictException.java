package com.chefsphere.exception_handler;

@SuppressWarnings("serial")
public class CreatorConflictException extends RuntimeException {
	public CreatorConflictException(String message) {
		super(message);
	}
}
