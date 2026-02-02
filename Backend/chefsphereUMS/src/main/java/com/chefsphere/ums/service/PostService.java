package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.*;
import com.chefsphere.ums.entities.Creator;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface PostService {

	void createPost(PostRequestDTO vdto, HttpServletRequest req);

	List<PostResponseDTO> findAllByUserId(Long creatorId);

	List<PostResponseDTO> findAllByUserId(HttpServletRequest req);

	String deletePost(Creator c);
	
	public List<PostResponseDTO> findAllByCategory(String category) ;
	
	void deleteById(Long post_id);

	List<PostSearchDTO> findAllByPostTitle(String postName);

	List<FoodCategoryDTO> findRandomCategoriesByQty(Long qty);

	List<FoodCategoryDTO> findAllCategories();

	List<RecipeRandRespDTO> findRandomRecipeByQty(Integer qty);

	List<PostResponseDTO> findAllByIngredient(String ingredient);

	List<PostResponseDTO> findAllByDuration(Long prep_time);

	PostResponseDTO findByPostNo(Long post_no);

	List<PostResponseDTO> findAllPostsWithIngredients(List<String> ingredient_names, HttpServletRequest req);

	List<PostResponseDTO> findAllPosts();

	PostResponseDTO findByUserIdAndPostNo(Long post_no, HttpServletRequest req);

	void deleteById(Long post_id, HttpServletRequest req);

	void updatePostId(Long postId, PostUpdateDTO dto, HttpServletRequest req);

	void updatePostId(Long postId, PostUpdateDTO dto);
}
