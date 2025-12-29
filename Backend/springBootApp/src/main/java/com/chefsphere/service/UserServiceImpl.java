package com.chefsphere.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.chefsphere.dto.UserDetailsDto;
import com.chefsphere.dto.UserLoginDto;
import com.chefsphere.entities.User;
import com.chefsphere.exception_handler.BadRequestException;
import com.chefsphere.exception_handler.InvalidCredentialsException;
import com.chefsphere.repository.UserRepo;
import com.chefsphere.security.JwtUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	
	// dependencies
	private final UserRepo repo;
	private final ModelMapper mapper;
	private final JwtUtils jwtUtils; 
	
	@Override
	public UserDetailsDto signIn(UserLoginDto  userLoginDto) {
		User u = repo.findByEmail(userLoginDto.getEmail()).orElseThrow(()-> {throw new InvalidCredentialsException("Invalid email or password");});
//	    if (u.isPresent()) {
//	        throw new InvalidCredentialsException("Invalid email or password");
//	    }
		
		if(u.getPassword().equals(userLoginDto.getPassword())) {
			String token = jwtUtils.generateToken(u.getId(),u.getEmail(),u.getType().name());
			UserDetailsDto dto= mapper.map(u, UserDetailsDto.class);
			dto.setToken(token);
			return dto;
		}
		throw new InvalidCredentialsException("Invalid email or password");

	    //return mapper.map(u, UserDetailsDto.class);
	}

	@Override
	public void signUp(User newUser) throws Exception {
		// save user to db through repository
		User u = repo.save(newUser);
		
		// if return stored user is null failed to save user
	    if (u == null) {
	        throw new RuntimeException("Invalid user credentials");
	    }
		
	}
	
	@Override
	public void updateUser(User changeUser){
		// save user to db through repository
		User u = repo.save(changeUser);
		
		// if return stored user is null failed to save user
	    if (u == null) {
	        throw new BadRequestException("Changed user credentials");
	    }
	}

	@Override
	public boolean emailExist(String email) {
		if(repo.existsByEmail(email)) {
			System.out.println(repo.findByEmail(email));
			return true;
		}
		return false;
	}

	@Override
	public User findByEmail(String email) {
		return repo.findByEmail(email).get();
		
	}
	
	@Override
	public User findById(Long id) {
		return repo.findById(id).get();
	}
	
	@Override
	public boolean ifExist(String userName) {
		return repo.existsByUsername(userName);
	}

	@Override
	public boolean existsByUsername(String username) {
		// TODO Auto-generated method stub
		return false;
	}

	
}
