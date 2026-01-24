package com.chefsphere.ums.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.entities.Rating;


public interface RatingRepo extends JpaRepository<Rating, Long> {
	
	@Query("SELECT r FROM Rating r WHERE r.post.pid = :postId")
	Optional<Rating> findByPostId(@Param("postId") Long postId);

	Optional<Post> findByPost(Post post);
	
}
