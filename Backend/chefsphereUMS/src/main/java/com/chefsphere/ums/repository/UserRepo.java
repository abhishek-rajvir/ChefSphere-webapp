package com.chefsphere.ums.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chefsphere.ums.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

	Optional<User> findByEmailAndIsActiveTrue(String email);
	
	Optional<User> findByIdAndIsActiveTrue(Long id);

	boolean existsByEmailAndIsActiveTrue(String email);

	boolean existsByUsernameAndIsActiveTrue(String userName);
	
}
