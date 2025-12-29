package com.chefsphere.security;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.chefsphere.entities.User;
import com.chefsphere.repository.UserRepo;

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
