package com.chefsphere.ums.repository;

import com.chefsphere.ums.dto.CreatorRandomDTO;
import com.chefsphere.ums.entities.Creator;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CreatorRepo extends JpaRepository<Creator, Long> {

	@Query("""
	SELECT DISTINCT c
	FROM Creator c
	JOIN FETCH c.foodies f
	WHERE c.cid = :id
	  AND c.userId.isActive = true
	  AND f.userId.isActive = true
	""")
	Optional<Creator> findByIdWithFoodies(@Param("id") Long id);


	@Query("""
	SELECT DISTINCT c
	FROM Creator c
	JOIN FETCH c.foodies f
	WHERE c.userId.id = :id
	  AND c.userId.isActive = true
	  AND f.userId.isActive = true
	""")
	Optional<Creator> findByUserIdWithFoodies(@Param("id") Long id);


	@Query("""
	SELECT DISTINCT c
	FROM Creator c
	JOIN FETCH c.posts p
	WHERE c.cid = :id
		AND c.userId.isActive = true
  		AND p.isActive = true
	""")
	Optional<Creator> findByIdWithPosts(@Param("id") Long id);

	@Query("SELECT DISTINCT c FROM Creator c JOIN FETCH c.posts p WHERE c.userId.id = :uid AND c.userId.isActive = true AND p.isActive = true")
	Optional<Creator> findByUserIdWithPosts(@Param("uid") Long uid);

	Optional<Creator> findByCidAndUserId_IsActiveTrue(Long uid);
	Optional<Creator> findByUserId_IdAndUserId_IsActiveTrue(Long uid);
	
	@Query("""
		    SELECT new com.chefsphere.ums.dto.CreatorRandomDTO(c.cid, c.userId.id,c.userId.username,c.userId.pic)
		    FROM Creator c 
		    WHERE c.userId.isActive = true
		""")
	List<CreatorRandomDTO> findCreators(Pageable pageable);

}
