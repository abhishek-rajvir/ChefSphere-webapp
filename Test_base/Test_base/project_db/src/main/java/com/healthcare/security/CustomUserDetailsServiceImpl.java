package com.healthcare.security;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.healthcare.entities.User;
import com.healthcare.repository.UserRepo;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	private final UserRepo userRepository;
	private final ModelMapper mapper;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		//get user details from db
		User user=userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email not found !!!!!"));
		return mapper.map(user, UserDetails.class);
	}

}
