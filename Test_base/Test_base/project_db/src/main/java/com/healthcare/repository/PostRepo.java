package com.healthcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.Post;

public interface PostRepo extends JpaRepository<Post, Long>{

}
