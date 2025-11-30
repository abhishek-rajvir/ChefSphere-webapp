package com.healthcare.service;


import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.healthcare.dto.IngredientsRequestDto;
import com.healthcare.dto.PostRequestDto;
import com.healthcare.dto.PostResponseDto;
import com.healthcare.dto.RecipeStepsDto;
import com.healthcare.entities.Creator;
import com.healthcare.entities.Ingredients;
import com.healthcare.entities.Post;
import com.healthcare.entities.Recipe;
import com.healthcare.entities.RecipeSteps;
import com.healthcare.exception_handler.NoContentException;
import com.healthcare.exception_handler.ResourceNotFoundException;
import com.healthcare.repository.CreatorRepo;
import com.healthcare.repository.IngredientRepo;
import com.healthcare.repository.PostRepo;
import com.healthcare.repository.RecipeRepo;
import com.healthcare.repository.RecipeStepsRepo;
import com.healthcare.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PostServiceImpl{

	private final CreatorServiceImpl creatorService;
	private final IngredientRepo ingredientRepo;
	private final RecipeStepsRepo recipeStepsRepo;
	private final RecipeRepo recipeRepo;
	private final PostRepo postRepo; 
	private final CreatorRepo creatorRepo;
	private final YoutubeApiService ytapiService;
	private final JwtUtils jwtUtils;
	private final ModelMapper mapper;


	//@Override
	public void createPost(PostRequestDto p_dto,HttpServletRequest req) {
		
		
		// post basic validation
		int len = p_dto.getPost_title().length();
		if(len >=30 && len <=80) {

			Post post = new Post();
			post.setPost_title(p_dto.getPost_title());
			post.setDescription(p_dto.getDescription());
			
			Recipe recipe = mapper.map(p_dto.getRecipe_Details(),Recipe.class);
			Recipe recipe2 = recipeRepo.save(recipe);
			
			// get list of ing
			List<Ingredients> ingredients = p_dto.getList_Of_Ingredients().stream().map(s->mapper.map(s,Ingredients.class)).toList();
			
			// get List of steps
			List<RecipeSteps> recipe_steps = p_dto.getList_of_Steps().stream().map(s->mapper.map(s,RecipeSteps.class)).toList();
			
			// add ing to recipe
			ingredients.forEach(s->{
				s.setRecipe(recipe2);
				recipe2.addIngredient(s);
				ingredientRepo.save(s);
			});
			
			recipe_steps.forEach(s->{
				s.setRecipe(recipe2);
				recipeStepsRepo.save(s);
			});
			
			post.setRecipe(recipe2);
			post.setVideoTag(ytapiService.verifyURL(p_dto.getVideoUrl()));
			
			// get token
			String token = jwtUtils.extractToken(req);
			
			// get user id
			Long Userid = jwtUtils.extractUserId(token);
			
			// find creator by user id
			Creator c = creatorService.findById(Userid);
			
			post.setCreator(c);
			
			postRepo.save(post);
		}
		else {			
			System.out.println(len);
			throw new RuntimeException("Post title should be 30 to 60 characters long");
		}
		

	}

	
	//@Override
	public void updatePostId(Long post_id,PostRequestDto dto, HttpServletRequest req) {
	    Post post = postRepo.findById(post_id)
		            .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
	    if(dto.getDescription() != null) {
	    	post.setDescription(dto.getDescription());
	    }
	    if(dto.getPost_title() != null) {
	    	post.setPost_title(dto.getPost_title());
	    }
	    if(dto.getVideoUrl() != null) {
	    	post.setVideoTag(dto.getVideoUrl());
	    }
	    
		Recipe recipe = recipeRepo.findById(postRepo.findRecipeId(post_id).get()).get();
	    if(dto.getRecipe_Details() != null) {	    	
//	    	final Recipe recipe2;
	    	
	    	// smart update
	    	mapper.map(dto.getRecipe_Details(),recipe);
	    	recipe = recipeRepo.save(recipe);
	    }
	    
	    if(!dto.getList_Of_Ingredients().isEmpty()) {
	    	
	    	// get list of ing
	    	final Recipe recipe2 = recipe;
	    	List<Ingredients> ingredients = dto.getList_Of_Ingredients().stream().map(s->mapper.map(s,Ingredients.class)).toList();
	    	
	    	// add ing to recipe
			ingredients.forEach(s->{
				s.setRecipe(recipe2);
				ingredientRepo.save(s);
			});
	    }
	    
	    if(!dto.getList_of_Steps().isEmpty()) {
	    	final Recipe recipe2 = recipe;
			// get List of steps
			List<RecipeSteps> recipe_steps = dto.getList_of_Steps().stream().map(s->mapper.map(s,RecipeSteps.class)).toList();

			recipe_steps.forEach(s->{
				s.setRecipe(recipe2);
				recipeStepsRepo.save(s);
			});
			
	    }
		   	
    	post.setRecipe(recipe);
	    
	    postRepo.save(post);
	}

	//@Override
	public void deleteById(Long post_id, HttpServletRequest req) {
		
		Optional<Post> p = postRepo.findById(post_id);
		
		// get token
		String token = jwtUtils.extractToken(req);
		
		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		if(postRepo.existsByPidAndCreatorCid(p.get().getPid(),Userid) && p.isPresent()) {				
			Optional<Long> recid = postRepo.findRecipeId(post_id);
			if(recid.isPresent()) {			
				Optional<Recipe> recipe = recipeRepo.findById(recid.get());			
				// remove all ingredients
				List<Ingredients> ing_list = ingredientRepo.findByRecipeid(recid.get());
				if(ing_list.isEmpty()) {
					// pass no ing to delete
				}
				else {
					ing_list.forEach(s->{
						s.setRecipe(null);
						ingredientRepo.delete(s);
					});
				}				
				// remove recipe
				recipeRepo.delete(recipe.get());
			}
			else {
				// no recipe id
				p.get().setRecipe(null);
				postRepo.delete(p.get());
			}
		}
		else {
			throw new ResourceNotFoundException("User has no posts by post_id: "+post_id);
		}
	}

	/*
	 * Search post section
	 */

	//@Override
	public PostResponseDto findByUserIdAndPostNo(Long post_no, HttpServletRequest req) {
		String token = jwtUtils.extractToken(req);
		Long Userid = jwtUtils.extractUserId(token);
		
		Post p = creatorRepo.findByIdWithPosts(Userid)
				.getPosts().get(Math.toIntExact(post_no));
		
		if(p != null) {
			// convert ing to dto
			List<IngredientsRequestDto> ing_list = p.getRecipe().getSteps_required()
					.stream().map(i->mapper.map(i, IngredientsRequestDto.class)).toList();

			// convert steps to dto
			List<RecipeStepsDto> rec_steps_list = p.getRecipe().getAllIngredients()
					.stream().map(rc->mapper.map(rc, RecipeStepsDto.class)).toList();
			
			// convert post to dto
			PostResponseDto post = mapper.map(p, PostResponseDto.class);
			
			// add ingdto to postdto
			post.setList_Of_Ingredients(ing_list);
			
			// add recdto to postdto
			post.setList_of_Steps(rec_steps_list);
			return post;
		}
		else {
			throw new NoContentException("User has no posts no: "+post_no);
		} 
	}
	
	//@Override
	public List<PostResponseDto> findAllPosts() {
		
		List<Post> postlist = postRepo.findAll();
		List<PostResponseDto> list = postlist.stream().map(s->mapper.map(s, PostResponseDto.class)).toList();

		if(!list.isEmpty()) {
			List<PostResponseDto> post_list = postlist.stream().map(s->
			{
				List<IngredientsRequestDto> ing_list = s.getRecipe().getSteps_required()
						.stream().map(i->mapper.map(i, IngredientsRequestDto.class)).toList();
				
				List<RecipeStepsDto> rec_steps_list = s.getRecipe().getAllIngredients()
						.stream().map(rc->mapper.map(rc, RecipeStepsDto.class)).toList();
		
				PostResponseDto s2 = mapper.map(s, PostResponseDto.class);
				s2.setList_Of_Ingredients(ing_list);
				s2.setList_of_Steps(rec_steps_list);
				return s2;
				
			}).toList();
			
			return post_list;
			
		}
		else {
			throw new NoContentException("Creator doesn't have any posts");
		}
	}

	public List<PostResponseDto> findAllByUserId(HttpServletRequest req) {
		
		String token = jwtUtils.extractToken(req);
		Long Userid = jwtUtils.extractUserId(token);
		
		Creator c = creatorRepo.findByIdWithPosts(Userid);
		
		List<Post> postlist = c.getPosts();
		if(!postlist.isEmpty()) {
			List<PostResponseDto> list = postlist.stream().map(s->
			{
				List<IngredientsRequestDto> ing_list = s.getRecipe().getSteps_required()
						.stream().map(i->mapper.map(i, IngredientsRequestDto.class)).toList();
				
				List<RecipeStepsDto> rec_steps_list = s.getRecipe().getAllIngredients()
						.stream().map(rc->mapper.map(rc, RecipeStepsDto.class)).toList();
		
				PostResponseDto s2 = mapper.map(s, PostResponseDto.class);
				s2.setList_Of_Ingredients(ing_list);
				s2.setList_of_Steps(rec_steps_list);
				return s2;
				
			}).toList();
			
			return list;
			
		}
		else {
			throw new ResourceNotFoundException("User has no posts");
		}
	}
	
	
	
	//@Override
	public List<PostResponseDto> findAllPostsWithIngredients(List<String> ingredient_names,HttpServletRequest req) {
		
		String token = jwtUtils.extractToken(req);
		Long Userid = jwtUtils.extractUserId(token);
		
		List<Ingredients> ing_list = ingredientRepo.findByNameInIgnoreCase(ingredient_names);
		
		
		List<Post> postlist = postRepo.findAll();
		List<PostResponseDto> list = postlist.stream().map(s->mapper.map(s, PostResponseDto.class)).toList();

		if(!list.isEmpty()) {
			List<PostResponseDto> post_list = postlist.stream().map(s->
			{
				List<IngredientsRequestDto> list1 = s.getRecipe().getSteps_required()
						.stream().map(i->mapper.map(i, IngredientsRequestDto.class)).toList();
				
				List<RecipeStepsDto> rec_steps_list = s.getRecipe().getAllIngredients()
						.stream().map(rc->mapper.map(rc, RecipeStepsDto.class)).toList();
		
				PostResponseDto s2 = mapper.map(s, PostResponseDto.class);
				s2.setList_Of_Ingredients(list1);
				s2.setList_of_Steps(rec_steps_list);
				return s2;
				
			}).toList();
			
			return post_list;
			
		}
		else {
			throw new NoContentException("Creator doesn't have any posts");
		}
	}

}
