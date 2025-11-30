package com.healthcare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcare.entities.Post;

public interface PostRepo extends JpaRepository<Post, Long>{
	List<Post> findByCreatorCid(Long id);

//	@Query("SELECT p FROM Post p WHERE p.pid =:postid and ")
	Optional<Post> findByCreatorCidAndPid(Long creatorid,Long postid);
	
	@Query("SELECT p.recipe FROM Post p WHERE p.pid =:pid")
	Optional<Long> findRecipeId(@Param("pid") Long pid);
	
	boolean existsByPidAndCreatorCid(Long postId, Long creatorId);
}
