package com.chefsphere.ums.repository;

import com.chefsphere.ums.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

	Optional<User> findByEmailAndIsActiveTrue(String email);
	
	Optional<User> findByIdAndIsActiveTrue(Long id);

	boolean existsByEmailAndIsActiveTrue(String email);

	boolean existsByUsernameAndIsActiveTrue(String userName);
	
}
