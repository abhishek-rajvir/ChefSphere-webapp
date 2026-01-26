package com.chefsphere.ums.exception_handler;

@SuppressWarnings("serial")
public class ImageKitException extends RuntimeException {
	public ImageKitException(String errMesg) {
		super(errMesg);
	}
}
