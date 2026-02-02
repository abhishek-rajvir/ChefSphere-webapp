package com.chefsphere.ums.repository;

import com.chefsphere.ums.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CommentRepo extends JpaRepository<Comment, Long> {
	
//	@Query("SELECT c FROM Comment c WHERE c.post.pid = :postId")
//	List<Comment> findByPostId(@Param("postId") Long postId);
	List<Comment> findByPost_Pid(Long postId);
	
}
