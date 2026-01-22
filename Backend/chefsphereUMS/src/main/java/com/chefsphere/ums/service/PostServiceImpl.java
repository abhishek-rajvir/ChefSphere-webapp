package com.chefsphere.ums.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.FoodCategoryDto;
import com.chefsphere.ums.dto.IngredientsRequestDto;
import com.chefsphere.ums.dto.PostRequestDto;
import com.chefsphere.ums.dto.PostResponseDto;
import com.chefsphere.ums.dto.RecipeRandRespDto;
import com.chefsphere.ums.dto.RecipeRequestDto;
import com.chefsphere.ums.dto.RecipeStepsDto;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.FoodCategory;
import com.chefsphere.ums.entities.Ingredients;
import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.entities.Recipe;
import com.chefsphere.ums.entities.RecipeSteps;
import com.chefsphere.ums.exception_handler.InvalidIdException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.exception_handler.ResourceNotFoundException;
import com.chefsphere.ums.repository.CreatorRepo;
import com.chefsphere.ums.repository.FoodCategoryRepo;
import com.chefsphere.ums.repository.IngredientRepo;
import com.chefsphere.ums.repository.PostRepo;
import com.chefsphere.ums.repository.RecipeRepo;
import com.chefsphere.ums.repository.RecipeStepsRepo;
import com.chefsphere.ums.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PostServiceImpl {

	private final CreatorServiceImpl creatorService;
	private final IngredientRepo ingredientRepo;
	private final RecipeStepsRepo recipeStepsRepo;
	private final RecipeRepo recipeRepo;
	private final PostRepo postRepo;
	private final FoodCategoryRepo foodCategoryRepo;
	private final CreatorRepo creatorRepo;
	private final YoutubeApiService ytapiService;
	private final JwtUtils jwtUtils;
	private final ModelMapper mapper;

	// @Override
	public void createPost(PostRequestDto p_dto, HttpServletRequest req) {

		// post basic validation
		int len = p_dto.getPostTitle().length();
		if (len >= 30 && len <= 80) {

			// get token
			String token = jwtUtils.extractToken(req);

			// get user id
			Long Userid = jwtUtils.extractUserId(token);

			// find creator by user id
			Creator c = creatorService.findByUserId(Userid);

			Post post = new Post();
			post.setPostTitle(p_dto.getPostTitle());
			post.setDescription(p_dto.getDescription());

			Recipe recipe = mapper.map(p_dto.getRecipe_Details(), Recipe.class);

			// get list of ing
			List<Ingredients> ingredients = p_dto.getList_Of_Ingredients().stream()
					.map(s -> mapper.map(s, Ingredients.class)).toList();

			// get List of steps
			List<RecipeSteps> recipe_steps = p_dto.getList_of_Steps().stream()
					.map(s -> mapper.map(s, RecipeSteps.class)).toList();

			List<FoodCategory> categorys = p_dto.getSet_of_categorys().stream()
					.map(s -> mapper.map(s, FoodCategory.class)).toList();

			// add ing to recipe
			ingredients.forEach(s -> {
				s.setRecipe(recipe);
				ingredientRepo.save(s);
				recipe.addIngredient(s);
			});

			recipe_steps.forEach(s -> {
				s.setRecipe(recipe);
				recipeStepsRepo.save(s);
				recipe.addSteps(s);
			});

			// add ing to recipe
			categorys.forEach(s -> {
				s.addRecipe(recipe);
				foodCategoryRepo.save(s);
				recipe.addFoodCategory(s);
			});

			Recipe recipe2 = recipeRepo.save(recipe);

			post.setRecipe(recipe2);
			post.setVideoTag(ytapiService.verifyURL(p_dto.getVideoUrl()));
			post.setVideoUrl(ytapiService.extractYouTubeVideoId(p_dto.getVideoUrl()));
			post.setCreator(c);

			postRepo.save(post);
		} else {
			System.out.println(len);
			throw new RuntimeException("Post title should be 30 to 60 characters long");
		}

	}

	// @Override
	public void updatePostId(Long post_id, PostRequestDto dto, HttpServletRequest req) {
		Post post = helperFindByUserIdAndPostNo(post_id, req);

		if (dto.getDescription() != null) {
			post.setDescription(dto.getDescription());
		}
		if (dto.getPostTitle() != null) {
			post.setPostTitle(dto.getPostTitle());
		}
		if (dto.getVideoUrl() != null) {
			post.setVideoTag(ytapiService.verifyURL(dto.getVideoUrl()));
			post.setVideoUrl(ytapiService.extractYouTubeVideoId(dto.getVideoUrl()));
		}

		Recipe recipe = postRepo.findRecipeByPostId(post_id).get();
		if (dto.getRecipe_Details() != null) {
//	    	final Recipe recipe2;

			// smart update
			mapper.map(dto.getRecipe_Details(), recipe);
			recipe = recipeRepo.save(recipe);
		}

		if (!dto.getList_Of_Ingredients().isEmpty()) {

			// get list of ing
			final Recipe recipe2 = recipe;
			List<Ingredients> ingredients = dto.getList_Of_Ingredients().stream()
					.map(s -> mapper.map(s, Ingredients.class)).toList();

			// add ing to recipe
			ingredients.forEach(s -> {
				s.setRecipe(recipe2);
				ingredientRepo.save(s);
			});
		}

		if (!dto.getList_of_Steps().isEmpty()) {
			final Recipe recipe2 = recipe;
			// get List of steps
			List<RecipeSteps> recipe_steps = dto.getList_of_Steps().stream().map(s -> mapper.map(s, RecipeSteps.class))
					.toList();

			recipe_steps.forEach(s -> {
				s.setRecipe(recipe2);
				recipeStepsRepo.save(s);
			});

		}

		post.setRecipe(recipe);

		postRepo.save(post);
	}

	// @Override
	public void deleteById(Long post_id, HttpServletRequest req) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		if (postRepo.existsByPidAndCreatorCid(post_id, Userid)) {
			Optional<Post> p = postRepo.findById(post_id);
			Recipe recipe = p.get().getRecipe();
			// remove all ingredients
			List<Ingredients> ing_list = recipe.getAllIngredients();
			if (ing_list.isEmpty()) {
				// pass no ing to delete
			} else {
				ing_list.forEach(s -> {
					s.setRecipe(null);
					ingredientRepo.delete(s);
				});
			}
			// remove recipe
			recipeRepo.delete(recipe);
//				p.get().setRecipe(null);
			postRepo.delete(p.get());
		} else {
			throw new ResourceNotFoundException("User has no posts by post_id: " + post_id);
		}
	}

	/*
	 * Search post section
	 */

	// @Override
	private Post helperFindByUserIdAndPostNo(Long post_no, HttpServletRequest req) {
		String token = jwtUtils.extractToken(req);
		Long Userid = jwtUtils.extractUserId(token);

		Optional<Post> post = postRepo.findById(post_no);

		if (!post.isEmpty()) {
			if (post.get().getCreator().getUserId().getId() == Userid) {
				return post.get();
			}
		}
		throw new InvalidIdException("User has no posts no: " + post_no);
	}

	public PostResponseDto findByUserIdAndPostNo(Long post_no, HttpServletRequest req) {
		String token = jwtUtils.extractToken(req);
		Long Userid = jwtUtils.extractUserId(token);

		Post p = null;

		try {
			p = creatorRepo.findByIdWithPosts(Userid).getPosts().get(Math.toIntExact(post_no));
		} catch (IndexOutOfBoundsException e) {
			throw new InvalidIdException("Post id does not exist");
		}

		if (p != null) {

			Recipe recipe = p.getRecipe();
			// convert ing to dto
			List<IngredientsRequestDto> ing_list = recipe.getAllIngredients().stream()
					.map(i -> mapper.map(i, IngredientsRequestDto.class)).toList();

			// convert steps to dto
			List<RecipeStepsDto> rec_steps_list = p.getRecipe().getSteps_required().stream()
					.map(rc -> mapper.map(rc, RecipeStepsDto.class)).toList();

			PostResponseDto resp_post = mapper.map(p, PostResponseDto.class);
			resp_post.setRecipe_Details(mapper.map(recipe, RecipeRequestDto.class));
			resp_post.setList_Of_Ingredients(ing_list);
			resp_post.setList_of_Steps(rec_steps_list);

			return resp_post;

		} else {
			throw new NoContentException("User has no posts no: " + post_no);
		}
	}

	// @Override
	public List<PostResponseDto> findAllPosts() {

		List<Post> postlist = postRepo.findAll();

		if (!postlist.isEmpty()) {

			List<PostResponseDto> resp_list = postlist.stream().map(post -> {
				Recipe recipe = post.getRecipe();
				List<IngredientsRequestDto> ing_list = recipe.getAllIngredients().stream()
						.map(i -> mapper.map(i, IngredientsRequestDto.class)).toList();

				List<RecipeStepsDto> rec_steps_list = recipe.getSteps_required().stream()
						.map(rc -> mapper.map(rc, RecipeStepsDto.class)).toList();

				List<FoodCategoryDto> food_category_list = recipe.getFoodCategories().stream()
						.map(rc -> mapper.map(rc, FoodCategoryDto.class)).toList();

				PostResponseDto s2 = mapper.map(post, PostResponseDto.class);
				s2.setRecipe_Details(mapper.map(recipe, RecipeRequestDto.class));
				s2.setList_Of_Ingredients(ing_list);
				s2.setList_of_Steps(rec_steps_list);
				s2.setList_of_categorys(food_category_list);
				return s2;

			}).toList();

			return resp_list;

		} else {
			throw new NoContentException("Creator doesn't have any posts");
		}
	}

	public List<PostResponseDto> findAllByUserId(Long creatorId) {

		Creator c = creatorRepo.findByIdWithPosts(creatorId);

		List<Post> postlist = c.getPosts();
		if (!postlist.isEmpty()) {
			List<PostResponseDto> list = postlist.stream().map(s -> {
				List<IngredientsRequestDto> ing_list = s.getRecipe().getSteps_required().stream()
						.map(i -> mapper.map(i, IngredientsRequestDto.class)).toList();

				List<RecipeStepsDto> rec_steps_list = s.getRecipe().getAllIngredients().stream()
						.map(rc -> mapper.map(rc, RecipeStepsDto.class)).toList();

				PostResponseDto s2 = mapper.map(s, PostResponseDto.class);
				s2.setList_Of_Ingredients(ing_list);
				s2.setList_of_Steps(rec_steps_list);
				return s2;

			}).toList();

			return list;

		} else {
			throw new ResourceNotFoundException("User has no posts");
		}
	}

	public List<PostResponseDto> findAllByUserId(HttpServletRequest req) {

		String token = jwtUtils.extractToken(req);
		Long Userid = jwtUtils.extractUserId(token);

		Creator c = creatorRepo.findByIdWithPosts(Userid);

		List<Post> postlist = c.getPosts();
		if (!postlist.isEmpty()) {
			List<PostResponseDto> list = postlist.stream().map(s -> {
				List<IngredientsRequestDto> ing_list = s.getRecipe().getSteps_required().stream()
						.map(i -> mapper.map(i, IngredientsRequestDto.class)).toList();

				List<RecipeStepsDto> rec_steps_list = s.getRecipe().getAllIngredients().stream()
						.map(rc -> mapper.map(rc, RecipeStepsDto.class)).toList();

				PostResponseDto s2 = mapper.map(s, PostResponseDto.class);
				s2.setList_Of_Ingredients(ing_list);
				s2.setList_of_Steps(rec_steps_list);
				return s2;

			}).toList();

			System.out.println(list);

			return list;

		} else {
			throw new ResourceNotFoundException("User has no posts");
		}
	}

	// @Override
	public List<PostResponseDto> findAllPostsWithIngredients(List<String> ingredient_names, HttpServletRequest req) {

//		String token = jwtUtils.extractToken(req);
//		Long Userid = jwtUtils.extractUserId(token);

//		List<Ingredients> ing_list = ingredientRepo.findByNameInIgnoreCase(ingredient_names);

		List<Post> postlist = postRepo.findAll();
		List<PostResponseDto> list = postlist.stream().map(s -> mapper.map(s, PostResponseDto.class)).toList();

		if (!list.isEmpty()) {
			List<PostResponseDto> post_list = postlist.stream().map(s -> {
				List<IngredientsRequestDto> list1 = s.getRecipe().getSteps_required().stream()
						.map(i -> mapper.map(i, IngredientsRequestDto.class)).toList();

				List<RecipeStepsDto> rec_steps_list = s.getRecipe().getAllIngredients().stream()
						.map(rc -> mapper.map(rc, RecipeStepsDto.class)).toList();

				PostResponseDto s2 = mapper.map(s, PostResponseDto.class);
				s2.setList_Of_Ingredients(list1);
				s2.setList_of_Steps(rec_steps_list);
				return s2;

			}).toList();

			return post_list;

		} else {
			throw new NoContentException("Creator doesn't have any posts");
		}
	}

	public PostResponseDto findByPostNo(Long post_no) {
		Optional<Post> post = postRepo.findById(post_no);
		if (post.isPresent()) {
			Recipe recipe = post.get().getRecipe();
			List<IngredientsRequestDto> ing_list = recipe.getAllIngredients().stream()
					.map(i -> mapper.map(i, IngredientsRequestDto.class)).toList();

			List<RecipeStepsDto> rec_steps_list = recipe.getSteps_required().stream()
					.map(rc -> mapper.map(rc, RecipeStepsDto.class)).toList();

			List<FoodCategoryDto> food_category_list = recipe.getFoodCategories().stream()
					.map(rc -> mapper.map(rc, FoodCategoryDto.class)).toList();

			PostResponseDto s2 = mapper.map(post, PostResponseDto.class);
			s2.setRecipe_Details(mapper.map(recipe, RecipeRequestDto.class));
			s2.setList_Of_Ingredients(ing_list);
			s2.setList_of_Steps(rec_steps_list);
			s2.setList_of_categorys(food_category_list);
			return s2;
		}
		throw new ResourceNotFoundException("Invalid post id");
	}

	public List<PostResponseDto> findAllByCategory(String category) {

		Optional<FoodCategory> fc = foodCategoryRepo.findByNameIgnoreCase(category);

		if (fc.isPresent()) {
			Set<Recipe> recList = fc.get().getRecipe();
			if (!recList.isEmpty()) {
				return postRepo.findByRecipeIn(recList).stream().map(s -> mapper.map(s, PostResponseDto.class))
						.toList();
			}
		}
		throw new ResourceNotFoundException("No posts by category " + category);
	}

	// le,gt,eq prep time
	public List<PostResponseDto> findAllByDuration(Long prep_time, Integer range) {
		if (prep_time > 0) {
			Set<Recipe> recList = null;
			if (range < 0) {
				recList = recipeRepo.findByPrepTimeLessThan(prep_time);
			} else {
				recList = recipeRepo.findByPrepTimeGreaterThan(prep_time);
			}
			if (!recList.isEmpty()) {
				return postRepo.findByRecipeIn(recList).stream().map(s -> mapper.map(s, PostResponseDto.class))
						.toList();
			}
		}
		throw new ResourceNotFoundException("No posts by prepTime: " + prep_time);
	}

	public List<PostResponseDto> findAllByIngredient(String ingredient) {

		Set<Recipe> recList = ingredientRepo.findByNameIgnoreCase(ingredient);

		if (!recList.isEmpty()) {
			return postRepo.findByRecipeIn(recList).stream().map(s -> mapper.map(s, PostResponseDto.class)).toList();
		}
		throw new ResourceNotFoundException("No posts by ingredient " + ingredient);
	}

	public List<RecipeRandRespDto> findRandomRecipeByQty(Integer qty) {
		List<Recipe> rec = recipeRepo.findRandomPosts(qty);
		
		
		if (rec != null || !rec.isEmpty()) {
			return rec.stream().map(r -> {
			    RecipeRandRespDto r2 = mapper.map(r, RecipeRandRespDto.class);

			    String videoId = r.getPost().getVideoUrl(); // contains only videoId

			    if (videoId != null && !videoId.isBlank()) {
			        r2.setVideoUrl( videoId );
			    }

			    return r2;
			}).toList();
		}
		throw new ResourceNotFoundException("No posts in db");
	}

	public List<FoodCategoryDto> findAllCategories() {
		List<FoodCategoryDto> fc = foodCategoryRepo.findAllDistinct();
		if(fc.isEmpty()) {			
			throw new ResourceNotFoundException("No foodcategories in db");
		}
		return fc;
	}
 
	public List<FoodCategoryDto> findRandomCategoriesByQty(Long qty) {
		Pageable pageable = PageRequest.of(0, qty.intValue());
		List<FoodCategoryDto> fc = foodCategoryRepo.findAllDistinct(pageable);
		if(fc!=null||!fc.isEmpty() ) {
			return fc;
		}
		throw new ResourceNotFoundException("No foodcategories in db");
	}

//		List<Post> postlist = c.getPosts();
//		if (!postlist.isEmpty()) {
//			List<PostResponseDto> list = postlist.stream().map(s -> {
//				List<IngredientsRequestDto> ing_list = s.getRecipe().getSteps_required().stream()
//						.map(i -> mapper.map(i, IngredientsRequestDto.class)).toList();
//
//				List<RecipeStepsDto> rec_steps_list = s.getRecipe().getAllIngredients().stream()
//						.map(rc -> mapper.map(rc, RecipeStepsDto.class)).toList();
//
//				PostResponseDto s2 = mapper.map(s, PostResponseDto.class);
//				s2.setList_Of_Ingredients(ing_list);
//				s2.setList_of_Steps(rec_steps_list);
//				return s2;
//
//			}).toList();

//			return null;

//		} else {
//			throw new ResourceNotFoundException("User has no posts");
//		}
//	}

}
