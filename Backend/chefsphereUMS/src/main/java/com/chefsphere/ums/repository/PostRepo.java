package com.chefsphere.ums.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.entities.Recipe;

public interface PostRepo extends JpaRepository<Post, Long> {
	List<Post> findByCreator_CidAndIsActiveTrue(Long id);

	Optional<Post> findByPidAndIsActiveTrue(Long pid);
	
	boolean existsByPidAndCreator_CidAndIsActiveTrue(
	        Long postId,
	        Long creatorId
	);

	@Query("""
		    SELECT p
		    FROM Post p
		    LEFT JOIN FETCH p.recipe
		    WHERE p.isActive = true
		""")
	List<Post> findAll();

	List<Post> findByRecipeInAndIsActiveTrue(Set<Recipe> recList);

	List<Post> findByPostTitleContainingIgnoreCaseAndIsActiveTrue(String postTitle);

}
