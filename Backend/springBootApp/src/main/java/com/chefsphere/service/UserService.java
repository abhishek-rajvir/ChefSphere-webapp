package com.chefsphere.service;


import com.chefsphere.dto.UserDetailsDto;
import com.chefsphere.dto.UserLoginDto;
import com.chefsphere.entities.User;

public interface UserService {
	UserDetailsDto signIn(UserLoginDto userLoginDto);
	
	boolean emailExist(String email);
	
	void signUp(User newUser) throws Exception;

	boolean existsByUsername(String username);
	
	User findByEmail(String email);

	User findById(Long id);

	boolean ifExist(String userName);

	void updateUser(User changeUser);

}
