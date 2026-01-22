package com.chefsphere.ums.service;


import java.util.List;

import com.chefsphere.ums.dto.ApiResponse;
import com.chefsphere.ums.dto.AuthRequest;
import com.chefsphere.ums.dto.UserDTO;
import com.chefsphere.ums.dto.UserDetailsDto;
import com.chefsphere.ums.entities.User;

public interface UserService {
	UserDetailsDto signIn(AuthRequest userLoginDto);
	
	boolean emailExist(String email);
	
	void signUp(User newUser) throws Exception;

	boolean existsByUsername(String username);
	
	User findByEmail(String email);

	User findById(Long id);

	boolean ifExist(String userName);

	void updateUser(User changeUser);

	ApiResponse<String> encryptPasswords();
	
	ApiResponse<String> encryptPassword(Long id);

	List<UserDTO> getAllUsers();

}
