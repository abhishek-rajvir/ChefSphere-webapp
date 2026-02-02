package com.chefsphere.ums.repository;

import com.chefsphere.ums.entities.Foodie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FoodieRepo extends JpaRepository<Foodie, Long> {

	@Query("""
	SELECT DISTINCT f
	FROM Foodie f
	JOIN FETCH f.creators c
	WHERE f.fid = :id
	 AND f.userId.isActive = true
  	 AND c.userId.isActive = true
	""")
	Optional<Foodie> findByIdWithCreators(@Param("id") Long id);


	@Query("""
	SELECT DISTINCT f
	FROM Foodie f
	JOIN FETCH f.creators c
	WHERE f.userId.id = :id
	  AND f.userId.isActive = true
	  AND c.userId.isActive = true
	""")
	Optional<Foodie> findByUserIdWithCreators(@Param("id") Long id);


	Optional<Foodie> findByUserId_IdAndUserId_IsActiveTrue(Long uid);
	
	Optional<Foodie> findByFidAndUserId_IsActiveTrue(Long fid);
	
	List<Foodie> findAllByUserId_IsActiveTrue();
}
