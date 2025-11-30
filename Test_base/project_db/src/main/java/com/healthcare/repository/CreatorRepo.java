package com.healthcare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcare.entities.Creator;

public interface CreatorRepo extends JpaRepository<Creator, Long>{
	
	@Query("SELECT c FROM Creator c LEFT JOIN FETCH c.foodies WHERE c.cid = :id")
	Optional<Creator> findByIdWithFoodies(@Param("id") Long id);
	
	@Query("SELECT c FROM Creator c LEFT JOIN FETCH c.posts WHERE c.cid = :id")
	Creator findByIdWithPosts(@Param("id") Long id);
}
