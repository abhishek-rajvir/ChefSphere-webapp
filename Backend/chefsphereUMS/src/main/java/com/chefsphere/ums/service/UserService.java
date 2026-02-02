package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.UserResponseDTO;
import com.chefsphere.ums.dto.UserSignUpDto;
import com.chefsphere.ums.dto.UserUpdateDto;
import com.chefsphere.ums.entities.User;
import jakarta.servlet.http.HttpServletRequest;

public interface UserService {

	void updateUserPassword(String email,String newPassword);

	void updateUser(User changeUser);

	boolean userNameExist(String userName);

	boolean userEmailExist(String email);

	String updateUserDetails(User u, UserUpdateDto dto);

	User findByEmail(String email);

	User findById(Long id);

	User createUser(Integer i, UserSignUpDto dto);

	UserResponseDTO userDetails(HttpServletRequest req);

	String updateUserDetails(HttpServletRequest req, UserUpdateDto dto);

	String deleteFoodie(Long id);

	String deleteFoodie(HttpServletRequest req);

	String deleteCreator(User user);

	String updateUserDetails(Long uid, UserUpdateDto dto);

	String deleteCreator(HttpServletRequest req);

	String deleteCreator(Long id);

	void deleteUserHard(Long id);

	UserResponseDTO userDetails(Long uid);

}
