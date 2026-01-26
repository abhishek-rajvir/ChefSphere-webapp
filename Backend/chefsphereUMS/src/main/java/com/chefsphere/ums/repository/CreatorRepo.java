package com.chefsphere.ums.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chefsphere.ums.dto.CreatorRandomDTO;
import com.chefsphere.ums.entities.Creator;

public interface CreatorRepo extends JpaRepository<Creator, Long> {

	@Query("SELECT c FROM Creator c LEFT JOIN FETCH c.foodies WHERE c.cid = :id AND c.userId.isActive = true")
	Optional<Creator> findByIdWithFoodies(@Param("id") Long id);

	@Query("SELECT c FROM Creator c LEFT JOIN FETCH c.foodies WHERE c.userId.id = :id AND c.userId.isActive = true")
	Optional<Creator> findByUserIdWithFoodies(@Param("id") Long id);
	
	
	@Query("SELECT c FROM Creator c LEFT JOIN FETCH c.posts WHERE c.cid = :id AND c.userId.isActive = true")
	Optional<Creator> findByIdWithPosts(@Param("id") Long id);

	@Query("SELECT c FROM Creator c LEFT JOIN FETCH c.posts WHERE c.userId.id = :uid AND c.userId.isActive = true")
	Optional<Creator> findByUserIdWithPosts(@Param("uid") Long uid);

//	@Query("""
//		    SELECT c
//		    FROM Creator c
//		    WHERE c.userId.id = :uid
//		    AND c.userId.isActive = true
//			""")
//	Optional<Creator> findByUserId(@Param("uid") Long uid);
	Optional<Creator> findByUserId_IdAndUserId_IsActiveTrue(Long uid);
	
	@Query("""
		    SELECT new com.chefsphere.ums.dto.CreatorRandomDto(c.cid, c.userId.id,c.userId.username,c.userId.pic)
		    FROM Creator c 
		    WHERE c.userId.isActive = true
		""")
	List<CreatorRandomDTO> findCreators(Pageable pageable);

}
