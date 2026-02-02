package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.AuthRequestDTO;
import com.chefsphere.ums.dto.UserDTO;
import com.chefsphere.ums.dto.UserResponseDTO;
import com.chefsphere.ums.entities.User;

import java.util.List;

public interface AuthService {
	UserResponseDTO signIn(AuthRequestDTO userLoginDto);

	void signUp(User newUser) throws Exception;

	void encryptPassword(User user);

	void encryptPassword(User user, String newPassword);

	boolean userNameExist(String userName);

	boolean userEmailExist(String email);

	User findById(Long id);

	String encryptPasswords();
	
	List<UserDTO> getAllUsers();

}
