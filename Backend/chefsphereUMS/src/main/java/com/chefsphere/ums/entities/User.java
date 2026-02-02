package com.chefsphere.ums.entities;

import jakarta.persistence.*;
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
	
	private String username;

	private String email;
	
	private String password;
	
	@Enumerated(EnumType.STRING)
	private UserType type;
	
	private String gender;
	
	private String pic;
	
	private String description;
	
	// boolen instead of Boolean ,since active state should be null 
	@Column(nullable = false)
	private boolean isActive = true;
	
	@OneToOne(mappedBy = "userId", cascade = CascadeType.ALL, orphanRemoval = true)
	private Foodie foodie;

	@OneToOne(mappedBy = "userId", cascade = CascadeType.ALL, orphanRemoval = true)
	private Creator creator;
	
}
