package com.chefsphere.ums.service;


import java.util.List;

import com.chefsphere.ums.dto.AuthRequestDTO;
import com.chefsphere.ums.dto.UserDTO;
import com.chefsphere.ums.dto.UserResponseDTO;
import com.chefsphere.ums.dto.UserSignUpDto;
import com.chefsphere.ums.dto.UserUpdateDto;
import com.chefsphere.ums.entities.User;

public interface UserService {
	UserResponseDTO signIn(AuthRequestDTO userLoginDto);
	
	boolean emailExist(String email);
	
	void signUp(User newUser) throws Exception;

	User findByEmail(String email);

	User findById(Long id);

	boolean userNameExist(String userName);

	void updateUser(User changeUser);

	String updateUserDetails(User u,UserUpdateDto dto);
	
	String encryptPasswords();
	
	List<UserDTO> getAllUsers();

	void encryptPassword(User user);
	void encryptPassword(User user,String newPassword);

	User createUser(Integer i, UserSignUpDto dto);

	String deleteUser(User user);

}
