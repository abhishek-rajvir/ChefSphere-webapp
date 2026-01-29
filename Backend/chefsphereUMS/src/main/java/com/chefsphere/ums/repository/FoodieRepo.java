package com.chefsphere.ums.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chefsphere.ums.entities.Foodie;

public interface FoodieRepo extends JpaRepository<Foodie, Long> {
	
	@Query("SELECT f FROM Foodie f LEFT JOIN FETCH f.creators WHERE f.fid = :id AND f.userId.isActive = true")
	Optional<Foodie> findByIdWithCreators(@Param("id") Long id);
	
	@Query("SELECT f FROM Foodie f LEFT JOIN FETCH f.creators WHERE f.userId.id = :id AND f.userId.isActive = true")
	Optional<Foodie> findByUserIdWithCreators(@Param("id") Long id);

	Optional<Foodie> findByUserId_IdAndUserId_IsActiveTrue(Long uid);
	
	Optional<Foodie> findByFidAndUserId_IsActiveTrue(Long fid);
	
	List<Foodie> findAllByUserId_IsActiveTrue();
}
