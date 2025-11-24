package com.healthcare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthcare.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
	Optional<User> findByEmailAndPassword(String email,String password);

	Optional<User> findByEmail(String email);
	
	Optional<User> findById(Long id);


	boolean existsByEmail(String email);

	boolean existsByUsername(String userName);
	
}
