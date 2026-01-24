package com.chefsphere.ums.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.RatingRequestDto;
import com.chefsphere.ums.dto.RatingResponseDto;
import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.entities.Rating;
import com.chefsphere.ums.exception_handler.InvalidIdException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.repository.PostRepo;
import com.chefsphere.ums.repository.RatingRepo;
import com.chefsphere.ums.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class RatingServiceImpl {

	private final PostRepo postRepo;
	private final RatingRepo ratingRepo;
	private final JwtUtils jwtUtils;
	private final ModelMapper mapper;

	// @Override
	public void newRating(RatingRequestDto c_dto, HttpServletRequest req) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		String uname = jwtUtils.extractUsername(token);

		// find creator by user id

		Post post = postRepo.findById(c_dto.getPostId())
		        .orElseThrow(() ->
		            new InvalidIdException("Post id " + c_dto.getPostId() + " doesnt exists")
		        );

		Rating rating = ratingRepo
				.findByPostId(post.getPid())
		        .orElseGet(() -> {
		            Rating r = new Rating();
		            r.setFoodieName(uname);
		            r.setPost(post);
		            return r;
		        });

		rating.setRating(c_dto.getRating());
		ratingRepo.save(rating);



	}

	// @Override
	public void deleteRatingById(Long postId) {

		Optional<Post> p = postRepo.findById(postId);
		if (p.isEmpty()) {
			throw new InvalidIdException("Post id " + postId + " doesnt exists");
		}
		Rating r = p.get().getRating();
		p.get().removeRating(r);
		postRepo.save(p.get());
		ratingRepo.delete(r);
	}

//	// @Override
//	public void updateComment(CommentUpdateDto c_dto, HttpServletRequest req) {
//
//		// post basic validation
//		int len = c_dto.getMessage().length();
//		// get token
//		String token = jwtUtils.extractToken(req);
//
//		// get user id
//		Long Userid = jwtUtils.extractUserId(token);
//
//		// find creator by user id
//		Foodie f = foodieService.findByUserIdWithComments(Userid);
//
//		Optional<Comment> c = commentRepo.findById(c_dto.getCommentId());
//		if (c.isPresent()) {
//
//			f.addComment(c.get());
//			foodieRepo.save(f);
//		}
//	}

	// @Override
	public RatingResponseDto findAllRatingByPostId(Long pid) {
		Optional<Rating> c = ratingRepo.findByPostId(pid);
		if (c.isEmpty()) {
			throw new NoContentException("Post has no comments");
		}
		RatingResponseDto cdto = mapper.map(c, RatingResponseDto.class);
		cdto.setPostId(pid);
		return cdto;
	}
}
