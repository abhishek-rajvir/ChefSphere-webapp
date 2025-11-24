package com.healthcare.exception_handler;

public class FoodieConflictException extends RuntimeException {
	public FoodieConflictException(String message) {
		super(message);
	}
}
