package com.chefsphere.ums.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
@ToString(callSuper = true,exclude = {"password","pic"})
public class User extends BaseEntity {//implements UserDetails{
	
	private String firstName;
	
	private String lastName;
	
	@Column(unique = true)
	private String username;
	
	@Column(unique = true)
	private String email;
	
	private String password;
	
	@Enumerated(EnumType.STRING)
	private UserType type;
	
	private String gender;
	
	private String pic;
	
	// boolen instead of Boolean ,since active state should be null 
	private boolean isActive = true;
//	
//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		// TODO Auto-generated method stub
//		return List.of(new SimpleGrantedAuthority(this.type.name()));
//	}
	
}
