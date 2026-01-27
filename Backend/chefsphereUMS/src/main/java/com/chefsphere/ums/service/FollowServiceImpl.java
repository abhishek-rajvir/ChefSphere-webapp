package com.chefsphere.ums.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.CreatorResponseDTO;
import com.chefsphere.ums.dto.FoodieResponseDTO;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.Foodie;
import com.chefsphere.ums.exception_handler.FollowConflictException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.exception_handler.ResourceNotFoundException;
import com.chefsphere.ums.exception_handler.UserNotFoundException;
import com.chefsphere.ums.repository.CreatorRepo;
import com.chefsphere.ums.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

/*
 * Follower service methods 
 */
@Service
@AllArgsConstructor
public class FollowServiceImpl implements FollowService {

	private final CreatorRepo creatorRepo;
	private final JwtUtils jwtUtils;
	private final ModelMapper mapper;
	private final FoodieService foodieService;

	@Override
	public Long totalFollowers(Long cid) {
		Creator creator = creatorRepo.findByIdWithFoodies(cid)
				.orElseThrow(() -> new UserNotFoundException("Creator ID: " + cid + " does not exist"));

		if (creator.getFoodies() == null && creator.getFoodies().isEmpty()) {
			return 0L;
		}

		return (long) creator.getFoodies().size();
	}

	@Override
	public List<FoodieResponseDTO> getFollowers(HttpServletRequest req) {

		// get user id
		Long uid = jwtUtils.extractUidFromReq(req);

		// find creator by user id
		return creatorRepo.findByUserIdWithFoodies(uid).map(c -> c.getFoodies().stream().map(f -> {
			FoodieResponseDTO fd = mapper.map(f.getUserId(), FoodieResponseDTO.class);
			fd.setFid(f.getFid());
			return fd;
		}).toList()).orElseThrow(() -> new ResourceNotFoundException("Creator ID not found for user id: " + uid));

	}

	@Override
	public Long followCreator(HttpServletRequest req, Long creator_id) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		// find foodie by user id
		Foodie f = foodieService.findByUserIdWithCreators(Userid);

		Long fid = f.getFid();

		if (f.getCreators().stream().anyMatch(s -> s.getCid() == (creator_id))) {
			throw new FollowConflictException("Foodie is already following creator: " + creator_id);
		}

		Creator c = foodieService.findCreatorWithFoodies(creator_id);
		// insert creator to set or following list
		f.getCreators().add(c);

		// commit changes
		foodieService.updateFoodie(f);

		return fid;
	}

	@Override
	public Long unfollowCreator(HttpServletRequest req, Long creator_id) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		// find creator by user id
		Foodie f = foodieService.findByUserIdWithCreators(Userid);

		Long fid = f.getFid();

		return f.getCreators().stream().filter(s -> s.getCid() == creator_id).findAny().map(c -> {

			f.getCreators().remove(c);

			// commit changes
			foodieService.updateFoodie(f);

			return fid;

		}).orElseThrow(() -> new FollowConflictException("Foodie doesn't follow creator: " + creator_id));
	}

	@Override
	public Long whetherfollowCreator(HttpServletRequest req, Long creator_id) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		// find creator by user id
		Foodie f = foodieService.findByUserIdWithCreators(Userid);

		Long fid = f.getFid();

		if (f.getCreators().stream().anyMatch(s -> s.getCid() == (creator_id))) {

			f = null;

			return fid;

		}
		throw new FollowConflictException("Foodie doesn't follow creator: " + creator_id);
	}

	@Override
	public List<CreatorResponseDTO> allFollowing(HttpServletRequest req) {
		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		// find creator by user id
		Foodie f = foodieService.findByUserIdWithCreators(Userid);

		if (f.getCreators().isEmpty()) {
			throw new NoContentException("Foodie doesnt follow any one");
		}
		return f.getCreators().stream().map(c -> {
			CreatorResponseDTO cdd = mapper.map(c.getUserId(), CreatorResponseDTO.class);
			cdd.setCid(c.getCid());
			return cdd;
		}).toList();
	}

}
