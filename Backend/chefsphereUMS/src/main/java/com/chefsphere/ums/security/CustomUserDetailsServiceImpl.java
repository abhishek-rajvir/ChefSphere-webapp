package com.chefsphere.ums.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.repository.UserRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	private final UserRepo userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		log.info("********* in load user ");
		User user=userRepo.findByEmailAndIsActiveTrue(email)
				.orElseThrow(() -> new UsernameNotFoundException("User by this email doesn't exist!!!!!!!!"));
		// email verified
		// userprincipal object to store id,email,grantAuthority
		return new UserPrincipal(String.valueOf(user.getId()),
				user.getEmail(),user.getUsername(),user.getPassword(),
				List.of(new SimpleGrantedAuthority(user.getType().name())),user.getType().name());
	}

}
