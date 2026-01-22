package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class CreatorConflictException extends RuntimeException {
	public CreatorConflictException(String message) {
		super(message);
	}
}
