package com.chefsphere.ums.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.AuthRequestDTO;
import com.chefsphere.ums.dto.UserDTO;
import com.chefsphere.ums.dto.UserResponseDTO;
import com.chefsphere.ums.dto.UserSignUpDto;
import com.chefsphere.ums.dto.UserUpdateDto;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.entities.UserType;
import com.chefsphere.ums.exception_handler.EmailAlreadyExistsException;
import com.chefsphere.ums.exception_handler.InvalidCredentialsException;
import com.chefsphere.ums.exception_handler.NoUniqueDataException;
import com.chefsphere.ums.exception_handler.UserNameAlreadyExistsException;
import com.chefsphere.ums.exception_handler.UserNotFoundException;
import com.chefsphere.ums.repository.UserRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

	// dependencies
	private final UserRepo userRepo;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public UserResponseDTO signIn(AuthRequestDTO userLoginDto) {
		User u = userRepo.findByEmailAndIsActiveTrue(userLoginDto.getEmail()).orElseThrow(() -> {
			throw new InvalidCredentialsException("Invalid email or password");
		});

		if (u.getPassword().equals(userLoginDto.getPassword())) {
		}
		throw new InvalidCredentialsException("Invalid email or password");
	}

	@Override
	public void signUp(User newUser) throws Exception {
		// save user to db through userRepository
		User u = userRepo.save(newUser);

		// if return stored user is null failed to save user
		if (u == null) {
			throw new InvalidCredentialsException("Invalid user credentials");
		}
	}

	public User createUser(Integer i, UserSignUpDto dto) {
		User newUser = modelMapper.map(dto, User.class);
		// 0 - Admin
		// 1 - Creator
		// 2 - Foodie
		if (userNameExist(dto.getUsername())) {
			throw new UserNameAlreadyExistsException("Username should be unique");
		}
		if (userEmailExist(dto.getEmail())) {
			throw new EmailAlreadyExistsException("Email address should be unique");
		}
		newUser.setType(UserType.values()[i]);
		encryptPassword(newUser);
		return userRepo.save(newUser);
	}

	public String updateUserDetails(User u, UserUpdateDto dto) {
		String str = "";

		if (dto.getEmail() != null) {
			u.setEmail(dto.getEmail());
			str += " email,";
		}
		if (dto.getFirstName() != null) {
			u.setFirstName(dto.getFirstName());
			str += " firstname,";
		}
		if (dto.getGender() != null) {
			u.setGender(dto.getGender());
			str += " gender,";
		}
		if (dto.getLastName() != null) {
			u.setLastName(dto.getLastName());
			str += " lastname,";
		}
		if (dto.getUsername() != null) {
			u.setUsername(dto.getUsername());
			str += " username,";
		}

		userRepo.save(u);

		if (str.length() > 0) {
			return "Updated " + str.substring(0, str.length() - 1);
		} else {
			throw new NoUniqueDataException("No distint credentials were provided");
		}

	}

	@Override
	public String encryptPasswords() {
		// get all users
		List<User> users = userRepo.findAll();
		// user - persistent
		users.forEach(user -> {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepo.save(user);
		});

		return "Passwords encrypted successfully";
	}

	@Override
	public void encryptPassword(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
	}

	@Override
	public void encryptPassword(User user, String newPassword) {
		user.setPassword(passwordEncoder.encode(newPassword));
	}

	@Override
	public List<UserDTO> getAllUsers() {

		return userRepo.findAll() // List<Entity>
				.stream() // Stream<Entity>
				.map(entity -> modelMapper.map(entity, UserDTO.class)) // Stream<DTO>
				.toList();
	}

	@Override
	public User findById(Long id) {
		Optional<User> u = userRepo.findByIdAndIsActiveTrue(id);
		if (u.isEmpty()) {
			throw new UserNotFoundException("Invalid user id" + id);
		}
		return u.get();
	}

	@Override
	public boolean userNameExist(String userName) {
		return userRepo.existsByUsernameAndIsActiveTrue(userName);
	}

	@Override
	public boolean userEmailExist(String email) {
		return userRepo.existsByEmailAndIsActiveTrue(email);
	}

}