package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.UserResponseDTO;
import com.chefsphere.ums.dto.UserSignUpDto;
import com.chefsphere.ums.dto.UserUpdateDto;
import com.chefsphere.ums.entities.User;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService {

	void updateUser(User changeUser);

	boolean userNameExist(String userName);

	boolean userEmailExist(String email);

	String deleteUser(User user);

	String updateUserDetails(User u, UserUpdateDto dto);

	User findByEmail(String email);

	User findById(Long id);

	User createUser(Integer i, UserSignUpDto dto);

	UserResponseDTO userDetails(HttpServletRequest req);

	String updateUserDetails(HttpServletRequest req, UserUpdateDto dto);

}
