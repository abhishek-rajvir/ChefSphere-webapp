package com.chefsphere.ums.exception_handler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.chefsphere.ums.dto.ApiResponse;

@RestControllerAdvice // To declare a spring bean containing global exception handling logic . SC is
						// offering global exc handling advice via this bean -> to all the rest
						// controllers in this app.
//try block - rest controller methods
//catch block - exc handler
public class GlobalExceptionHandler {
	
	// add exception handling method - to handle ResourceNotFoundException
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}
	
	@ExceptionHandler(FoodieConflictException.class)
	public ResponseEntity<?> handleFoodieConflictException(FoodieConflictException e) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}
	
	@ExceptionHandler(CreatorConflictException.class)
	public ResponseEntity<?> handleCreatorConflictException(CreatorConflictException e) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}
	
	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<?> handleInvalidCredentialsException(InvalidCredentialsException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}
	
	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<?> handleBadRequestException(BadRequestException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}
	
	@ExceptionHandler(InvalidDetailsException.class)
	public ResponseEntity<?> handleInvalidDetailsException(InvalidDetailsException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}

	@ExceptionHandler(InvalidIdException.class)
	public ResponseEntity<?> handleInvalidIdException(InvalidIdException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}
	@ExceptionHandler(InvalidJWTException.class)
	public ResponseEntity<?> handleInvalidIdException(InvalidJWTException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Expired"));
	}
	
	// add exception handling method - to handle NoContentException
	@ExceptionHandler(NoContentException.class)
	public ResponseEntity<?> handleNoContentException(NoContentException e) {
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}

	// add exception handling method - to handle auth exc
	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<?> handleAuthenticationException(AuthenticationException e) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}

	// catch all - handle ANY unchecked exception
	@ExceptionHandler(RuntimeException.class)
	//@ResponseStatus
	public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<String>(e.getLocalizedMessage(),false, "Failed"));
	}
	
	// add exception handling method - to handleP.L validation failure - for req body (JSON payload)

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(
	        MethodArgumentNotValidException e
	) {
	    Map<String, List<String>> errors =
	        e.getBindingResult()
	         .getFieldErrors()
	         .stream()
	         .collect(Collectors.groupingBy(
	             FieldError::getField,
	             Collectors.mapping(
	                 FieldError::getDefaultMessage,
	                 Collectors.toList()
	             )
	         ));

	    return ResponseEntity.badRequest().body(errors);
	}

}
