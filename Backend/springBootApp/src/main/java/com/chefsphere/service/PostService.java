package com.chefsphere.service;


import java.util.List;

import com.chefsphere.dto.PostRequestDto;
import com.chefsphere.dto.PostResponseDto;

import jakarta.servlet.http.HttpServletRequest;

public interface PostService {

//	public Post addRecipeAndIng(Post p,RecipeRequestDto recipedto, List<IngredientsRequestDto> ingredientdtolist);

	public void createPost(PostRequestDto vdto,HttpServletRequest req);

	public PostResponseDto findByPostId(Long post_id, HttpServletRequest req);	

	public List<PostResponseDto> findAll();

	List<PostResponseDto> findAllById(Long post_id, HttpServletRequest req);
	
	public void deleteById(Long post_id, HttpServletRequest req);

	void updatePostId(Long post_id, PostRequestDto dto, HttpServletRequest req);

	PostResponseDto findByUserPostNo(Long post_no, HttpServletRequest req);



}
