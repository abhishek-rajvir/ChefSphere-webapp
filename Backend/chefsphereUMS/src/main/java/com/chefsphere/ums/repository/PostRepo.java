package com.chefsphere.ums.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.entities.Recipe;

public interface PostRepo extends JpaRepository<Post, Long>{
	List<Post> findByCreatorCid(Long id);

//	@Query("SELECT p FROM Post p WHERE p.pid =:postid and ")
	Optional<Post> findByCreatorCidAndPid(Long creatorid,Long postid);
	
	@Query("SELECT p.recipe FROM Post p WHERE p.pid =:postId")
	Optional<Recipe> findRecipeByPostId(@Param("postId") Long postId);
	
	boolean existsByPidAndCreatorCid(Long postId, Long creatorId);
	
	@Query("SELECT p FROM Post p LEFT JOIN FETCH p.recipe")
	List<Post> findAll();
	
	List<Post> findByRecipeIn(Set<Recipe> recipe);
}
