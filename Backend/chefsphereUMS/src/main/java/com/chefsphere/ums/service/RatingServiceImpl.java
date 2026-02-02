package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.RatingRequestDTO;
import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.exception_handler.BadRequestException;
import com.chefsphere.ums.exception_handler.InvalidIdException;
import com.chefsphere.ums.repository.PostRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class RatingServiceImpl implements RatingService {

	private final PostRepo postRepo;

	@Override
	public void newRating(RatingRequestDTO r_dto) {
		Post post = postRepo.findById(r_dto.getPostId())
				.orElseThrow(() -> new InvalidIdException("Post id " + r_dto.getPostId() + " doesnt exists"));

		post.addRating(r_dto.getRating());
		postRepo.save(post);
	}

	@Override
	public void deleteRatingById(Long postId) {

		Optional<Post> p = postRepo.findById(postId);
		if (p.isEmpty()) {
			throw new InvalidIdException("Post id " + postId + " doesnt exists");
		}
		if (p.get().getAvgRating() == 0.0) {
			throw new BadRequestException("Post id " + postId + " has no ratings yet");
		}
		p.get().removeRating();
		postRepo.save(p.get());
	}

	@Override
	public Double findRatingByPostId(Long pid) {
		Optional<Post> p = postRepo.findById(pid);
		if (p.isEmpty()) {
			throw new InvalidIdException("No post by id " + pid);
		}
		if (p.get().getAvgRating() == 0.0) {
			throw new BadRequestException("Post has no ratings");
		}
		return p.get().getAvgRating();
	}

}
