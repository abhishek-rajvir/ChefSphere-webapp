package com.chefsphere.ums.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@SuppressWarnings("serial")
@RequiredArgsConstructor
@Getter
@Setter
@ToString
public class UserPrincipal implements UserDetails {

	private final String userId;
	private final String email;
	private final String name;
	private final String password;
	private final Collection<? extends GrantedAuthority> authorities;
	private final String userRole;
	

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return this.authorities;
	}
	
	

	public String getNameOfUser() {
		// TODO Auto-generated method stub
		return this.name;
	}
	
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}

}
