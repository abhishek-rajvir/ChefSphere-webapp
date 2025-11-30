package com.healthcare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcare.entities.Foodie;

public interface FoodieRepo extends JpaRepository<Foodie, Long> {
	
	@Query("SELECT f FROM Foodie f LEFT JOIN FETCH f.creators WHERE f.fid = :id")
	Optional<Foodie> findByIdWithCreators(@Param("id") Long id);
	
}
