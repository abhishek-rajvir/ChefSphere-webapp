package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class FoodieConflictException extends RuntimeException {
	public FoodieConflictException(String message) {
		super(message);
	}
}
