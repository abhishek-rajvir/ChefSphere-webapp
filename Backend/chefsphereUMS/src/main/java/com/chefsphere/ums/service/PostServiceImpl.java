package com.chefsphere.ums.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.CommentResponseDTO;
import com.chefsphere.ums.dto.FoodCategoryDTO;
import com.chefsphere.ums.dto.IngredientsRequestDTO;
import com.chefsphere.ums.dto.PostRequestDTO;
import com.chefsphere.ums.dto.PostResponseDTO;
import com.chefsphere.ums.dto.PostSearchDTO;
import com.chefsphere.ums.dto.PostUpdateDTO;
import com.chefsphere.ums.dto.RecipeRandRespDTO;
import com.chefsphere.ums.dto.RecipeRequestDTO;
import com.chefsphere.ums.dto.RecipeStepsDTO;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.FoodCategory;
import com.chefsphere.ums.entities.Ingredients;
import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.entities.Recipe;
import com.chefsphere.ums.entities.RecipeSteps;
import com.chefsphere.ums.exception_handler.InvalidFilterException;
import com.chefsphere.ums.exception_handler.InvalidDetailsException;
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
public class PostServiceImpl implements PostService {

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
	public void createPost(PostRequestDTO p_dto, HttpServletRequest req) {

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
			throw new InvalidDetailsException("Post title should be 30 to 60 characters long");
		}

	}

	@Transactional
	public void updatePostId(Long postId, PostUpdateDTO dto, HttpServletRequest req) {

		Post post = helperFindByUserIdAndPostNo(postId, req);

		// ---------- Post fields ----------
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

		// ---------- Recipe ----------
		Recipe recipe = recipeRepo.findByPost_pid(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Recipe not found for postId: " + postId));

		if (dto.getRecipe_Details() != null) {
			mapper.map(dto.getRecipe_Details(), recipe);
		}

		// ---------- Ingredients ----------
		if (dto.getList_Of_Ingredients() != null && !dto.getList_Of_Ingredients().isEmpty()) {

			// remove old ingredients
			ingredientRepo.deleteByRecipe(recipe);

			List<Ingredients> ingredients = dto.getList_Of_Ingredients().stream().map(i -> {
				Ingredients ing = mapper.map(i, Ingredients.class);
				ing.setRecipe(recipe);
				return ing;
			}).toList();

			ingredientRepo.saveAll(ingredients);
		}

		// ---------- Steps ----------
		if (dto.getList_of_Steps() != null && !dto.getList_of_Steps().isEmpty()) {

			// remove old steps
			recipeStepsRepo.deleteByRecipe(recipe);

			List<RecipeSteps> steps = dto.getList_of_Steps().stream().map(s -> {
				RecipeSteps step = mapper.map(s, RecipeSteps.class);
				step.setRecipe(recipe);
				return step;
			}).toList();

			recipeStepsRepo.saveAll(steps);
		}

		post.setRecipe(recipe);
		postRepo.save(post);
	}

	public String deletePost(Creator c) {

		List<Post> pList = c.getPosts();
		pList.stream().forEach(s->{
			s.setActive(false);
		});
		
		// save all modified persistent post
		postRepo.saveAll(pList);
		return "User post deleted succesfully";
	}

	// @Override
	public void deleteById(Long post_id, HttpServletRequest req) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		if (postRepo.existsByPidAndCreator_CidAndIsActiveTrue(post_id, Userid)) {
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
			throw new InvalidIdException("User has no posts by post_id: " + post_id);
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

	public PostResponseDTO findByUserIdAndPostNo(Long post_no, HttpServletRequest req) {
		String token = jwtUtils.extractToken(req);
		Long Userid = jwtUtils.extractUserId(token);

		Post p = null;

		try {
			p = creatorRepo.findByUserIdWithPosts(Userid).get().getPosts().get(Math.toIntExact(post_no));
		} catch (IndexOutOfBoundsException e) {
			throw new InvalidIdException("Post id does not exist");
		}

		if (p != null) {

			Recipe recipe = p.getRecipe();
			// convert ing to dto
			List<IngredientsRequestDTO> ing_list = recipe.getAllIngredients().stream()
					.map(i -> mapper.map(i, IngredientsRequestDTO.class)).toList();

			// convert steps to dto
			List<RecipeStepsDTO> rec_steps_list = p.getRecipe().getSteps_required().stream()
					.map(rc -> mapper.map(rc, RecipeStepsDTO.class)).toList();

			PostResponseDTO resp_post = mapper.map(p, PostResponseDTO.class);
			resp_post.setRecipe_Details(mapper.map(recipe, RecipeRequestDTO.class));
			resp_post.setList_Of_Ingredients(ing_list);
			resp_post.setList_of_Steps(rec_steps_list);

			return resp_post;

		} else {
			throw new InvalidIdException("User has no posts no: " + post_no);
		}
	}

	// @Override
	public List<PostResponseDTO> findAllPosts() {

		List<Post> postlist = postRepo.findAll();

		if (!postlist.isEmpty()) {

			List<PostResponseDTO> resp_list = postlist.stream().map(post -> {
				Recipe recipe = post.getRecipe();
				List<IngredientsRequestDTO> ing_list = recipe.getAllIngredients().stream()
						.map(i -> mapper.map(i, IngredientsRequestDTO.class)).toList();

				List<RecipeStepsDTO> rec_steps_list = recipe.getSteps_required().stream()
						.map(rc -> mapper.map(rc, RecipeStepsDTO.class)).toList();

				List<FoodCategoryDTO> food_category_list = recipe.getFoodCategories().stream()
						.map(rc -> mapper.map(rc, FoodCategoryDTO.class)).toList();

				PostResponseDTO s2 = mapper.map(post, PostResponseDTO.class);
				s2.setRecipe_Details(mapper.map(recipe, RecipeRequestDTO.class));
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

	public List<PostResponseDTO> findAllByUserId(Long creatorId) {

		Optional<Creator> c = creatorRepo.findByIdWithPosts(creatorId);
		if (c.isPresent()) {
			List<Post> postlist = c.get().getPosts();
			if (!postlist.isEmpty()) {
				List<PostResponseDTO> list = postlist.stream().map(s -> {
					List<IngredientsRequestDTO> ing_list = s.getRecipe().getSteps_required().stream()
							.map(i -> mapper.map(i, IngredientsRequestDTO.class)).toList();

					List<RecipeStepsDTO> rec_steps_list = s.getRecipe().getAllIngredients().stream()
							.map(rc -> mapper.map(rc, RecipeStepsDTO.class)).toList();

					PostResponseDTO s2 = mapper.map(s, PostResponseDTO.class);
					s2.setList_Of_Ingredients(ing_list);
					s2.setList_of_Steps(rec_steps_list);
					return s2;

				}).toList();

				return list;

			} else {
				throw new NoContentException("Creator has no posts");
			}

		}
		throw new NoContentException("Invalid Creator id " + creatorId);

	}

	public List<PostResponseDTO> findAllByUserId(HttpServletRequest req) {

		String token = jwtUtils.extractToken(req);
		Long Userid = jwtUtils.extractUserId(token);

		Optional<Creator> c = creatorRepo.findByUserIdWithPosts(Userid);

		if (c.isPresent()) {
			List<Post> postlist = c.get().getPosts();
			if (!postlist.isEmpty()) {
				List<PostResponseDTO> list = postlist.stream().map(s -> {
					List<IngredientsRequestDTO> ing_list = s.getRecipe().getSteps_required().stream()
							.map(i -> mapper.map(i, IngredientsRequestDTO.class)).toList();

					List<RecipeStepsDTO> rec_steps_list = s.getRecipe().getAllIngredients().stream()
							.map(rc -> mapper.map(rc, RecipeStepsDTO.class)).toList();

					PostResponseDTO s2 = mapper.map(s, PostResponseDTO.class);
					s2.setList_Of_Ingredients(ing_list);
					s2.setList_of_Steps(rec_steps_list);
					return s2;

				}).toList();

				return list;

			} else {
				throw new NoContentException("User has no posts");
			}
		}
		throw new NoContentException("Invalid User id " + Userid);
	}

	// @Override
	public List<PostResponseDTO> findAllPostsWithIngredients(List<String> ingredient_names, HttpServletRequest req) {

		List<Post> postlist = postRepo.findAll();
		List<PostResponseDTO> list = postlist.stream().map(s -> mapper.map(s, PostResponseDTO.class)).toList();

		if (!list.isEmpty()) {
			List<PostResponseDTO> post_list = postlist.stream().map(s -> {
				List<IngredientsRequestDTO> list1 = s.getRecipe().getSteps_required().stream()
						.map(i -> mapper.map(i, IngredientsRequestDTO.class)).toList();

				List<RecipeStepsDTO> rec_steps_list = s.getRecipe().getAllIngredients().stream()
						.map(rc -> mapper.map(rc, RecipeStepsDTO.class)).toList();

				PostResponseDTO s2 = mapper.map(s, PostResponseDTO.class);
				s2.setList_Of_Ingredients(list1);
				s2.setList_of_Steps(rec_steps_list);
				return s2;

			}).toList();

			return post_list;

		} else {
			throw new NoContentException("Creator doesn't have any posts");
		}
	}

	public PostResponseDTO findByPostNo(Long post_no) {
		Optional<Post> post = postRepo.findById(post_no);
		if (post.isPresent()) {
			Recipe recipe = post.get().getRecipe();
			List<IngredientsRequestDTO> ing_list = recipe.getAllIngredients().stream()
					.map(i -> mapper.map(i, IngredientsRequestDTO.class)).toList();

			List<RecipeStepsDTO> rec_steps_list = recipe.getSteps_required().stream()
					.map(rc -> mapper.map(rc, RecipeStepsDTO.class)).toList();

			List<FoodCategoryDTO> food_category_list = recipe.getFoodCategories().stream()
					.map(fc -> mapper.map(fc, FoodCategoryDTO.class)).toList();
			List<CommentResponseDTO> comment_list = post.get().getComments().stream()
					.map(c -> mapper.map(c, CommentResponseDTO.class)).toList();

			PostResponseDTO s2 = mapper.map(post, PostResponseDTO.class);
			s2.setRecipe_Details(mapper.map(recipe, RecipeRequestDTO.class));
			s2.setList_Of_Ingredients(ing_list);
			s2.setList_of_Steps(rec_steps_list);
			s2.setList_of_categorys(food_category_list);
			s2.setList_of_comments(comment_list);
			s2.setRating(post.get().getAvgRating());
			s2.setCreatorName(post.get().getCreator().getUserId().getUsername());
			return s2;
		}
		throw new InvalidIdException("Invalid post id");
	}

	public List<PostResponseDTO> findAllByCategory(String category) {

		Set<Recipe> recList = recipeRepo.findByFoodCategories_NameIgnoreCase(category);
		if (recList.isEmpty()) {
			throw new InvalidFilterException("No recipes found for category [" + category + "]");
		}

		return postRepo.findByRecipeInAndIsActiveTrue(recList).stream().map(s -> mapper.map(s, PostResponseDTO.class))
				.toList();

	}

	// le,gt,eq prep time
	public List<PostResponseDTO> findAllByDuration(Long prep_time, Integer range) {
		if (prep_time > 0) {
			Set<Recipe> recList = null;
			if (range < 0) {
				recList = recipeRepo.findByPrepTimeLessThan(prep_time);
			} else {
				recList = recipeRepo.findByPrepTimeGreaterThan(prep_time);
			}
			if (!recList.isEmpty()) {
				return postRepo.findByRecipeInAndIsActiveTrue(recList).stream()
						.map(s -> mapper.map(s, PostResponseDTO.class)).toList();
			}
		}
		throw new InvalidFilterException("No posts by prepTime: " + prep_time);
	}

	public List<PostResponseDTO> findAllByIngredient(String ingredient) {

		Set<Recipe> recList = ingredientRepo.findByNameIgnoreCase(ingredient);

		if (!recList.isEmpty()) {
			return postRepo.findByRecipeInAndIsActiveTrue(recList).stream()
					.map(s -> mapper.map(s, PostResponseDTO.class)).toList();
		}
		throw new InvalidFilterException("No posts by ingredient " + ingredient);
	}

	public List<RecipeRandRespDTO> findRandomRecipeByQty(Integer qty) {
		List<Recipe> rec = recipeRepo.findRandomPosts(qty);

		if (rec != null && !rec.isEmpty()) {
			return rec.stream().map(r -> {
				RecipeRandRespDTO r2 = mapper.map(r, RecipeRandRespDTO.class);

				String videoId = r.getPost().getVideoUrl(); // contains only videoId

				if (videoId != null && !videoId.isBlank()) {
					r2.setVideoUrl(videoId);
				}

				r2.setPid(r.getPost().getPid());

				return r2;
			}).toList();
		}
		throw new NoContentException("No posts in db");
	}

	public List<FoodCategoryDTO> findAllCategories() {
		List<FoodCategoryDTO> fc = foodCategoryRepo.findAllDistinct();
		if (fc.isEmpty()) {
			throw new NoContentException("No foodcategories in db");
		}
		return fc;
	}

	public List<FoodCategoryDTO> findRandomCategoriesByQty(Long qty) {
		Pageable pageable = PageRequest.of(0, qty.intValue());
		List<FoodCategoryDTO> fc = foodCategoryRepo.findAllDistinct(pageable);
		if (fc != null && !fc.isEmpty()) {
			return fc;
		}
		throw new NoContentException("No foodcategories in db");
	}

	public List<PostSearchDTO> findAllByPostTitle(String postName) {
		List<Post> pList = postRepo.findByPostTitleContainingIgnoreCaseAndIsActiveTrue(postName);
		if (pList != null && !pList.isEmpty()) {
			return pList.stream().map(s -> mapper.map(s, PostSearchDTO.class)).toList();
		}
		throw new InvalidFilterException("No posts titles containing " + postName);
	}

}
