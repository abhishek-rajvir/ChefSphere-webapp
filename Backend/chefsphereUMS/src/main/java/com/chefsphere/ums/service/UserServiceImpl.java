package com.chefsphere.ums.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.ApiResponse;
import com.chefsphere.ums.dto.AuthRequest;
import com.chefsphere.ums.dto.UserDTO;
import com.chefsphere.ums.dto.UserDetailsDto;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.exception_handler.BadRequestException;
import com.chefsphere.ums.exception_handler.InvalidCredentialsException;
import com.chefsphere.ums.exception_handler.ResourceNotFoundException;
import com.chefsphere.ums.repository.UserRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	
	// dependencies
	private final UserRepo userRepo;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetailsDto signIn(AuthRequest  userLoginDto) {
		User u = userRepo.findByEmail(userLoginDto.getEmail()).orElseThrow(()-> {throw new InvalidCredentialsException("Invalid email or password");});
//	    if (u.isPresent()) {
//	        throw new InvalidCredentialsException("Invalid email or password");
//	    }
		
		if(u.getPassword().equals(userLoginDto.getPassword())) {
//			String token = jwtUtils.generateToken(new UserPrincipal(null, null, null, null, null));
//			UserDetailsDto dto= mapper.map(u, UserDetailsDto.class);
//			dto.setToken(token);
//			return dto;
		}
		throw new InvalidCredentialsException("Invalid email or password");

	    //return mapper.map(u, UserDetailsDto.class);
	}

	@Override
	public void signUp(User newUser) throws Exception {
		// save user to db through userRepository
		User u = userRepo.save(newUser);
		
		// if return stored user is null failed to save user
	    if (u == null) {
	        throw new RuntimeException("Invalid user credentials");
	    }
		
	}
	
	@Override
	public void updateUser(User changeUser){
		// save user to db through userRepository
		User u = userRepo.save(changeUser);
		
		// if return stored user is null failed to save user
	    if (u == null) {
	        throw new BadRequestException("Changed user credentials");
	    }
	}

	@Override
	public boolean emailExist(String email) {
		if(userRepo.existsByEmail(email)) {
			System.out.println(userRepo.findByEmail(email));
			return true;
		}
		return false;
	}
	
	@Override
	public ApiResponse<String> encryptPasswords() {
		//get all users
		List<User> users = userRepo.findAll();	
		//user - persistent
		users.forEach(	user ->{			
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepo.save(user);
		});
		
		return new ApiResponse<String>("Password encrypted",true, "Success");
	}
	
	@Override
	public ApiResponse<String> encryptPassword(Long id) {
		//get user by id
		User user = userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
		
		//user - persistent
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepo.save(user);
		
		return new ApiResponse<String>("Password encrypted",true, "Success");
	}
	
	@Override
	public List<UserDTO> getAllUsers() {
		
		return userRepo.findAll() //List<Entity>
				.stream() //Stream<Entity>
				.map(entity -> modelMapper.map(entity, UserDTO.class)) //Stream<DTO>
				.toList();
	}

	@Override
	public User findByEmail(String email) {
		return userRepo.findByEmail(email).get();
		
	}
	
	@Override
	public User findById(Long id) {
		return userRepo.findById(id).get();
	}
	
	@Override
	public boolean ifExist(String userName) {
		return userRepo.existsByUsername(userName);
	}

	@Override
	public boolean existsByUsername(String username) {
		return !userRepo.existsByUsername(username);
	}

	
}
