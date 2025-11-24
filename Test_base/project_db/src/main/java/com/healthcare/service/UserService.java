package com.healthcare.service;


import com.healthcare.dto.UserDetailsDto;
import com.healthcare.dto.UserLoginDto;
import com.healthcare.entities.User;

public interface UserService {
	UserDetailsDto signIn(UserLoginDto userLoginDto);
	
	boolean emailExist(String email);
	
	void signUp(User newUser) throws Exception;

	User findByEmail(String email);

	User findById(Long id);

	boolean ifExist(String userName);

	void updateUser(User changeUser);

}
