package com.chefsphere.ums.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.CreatorDetailsDto;
import com.chefsphere.ums.dto.FoodieDetailsDto;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.Foodie;
import com.chefsphere.ums.exception_handler.FoodieConflictException;
import com.chefsphere.ums.exception_handler.InvalidDetailsException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.exception_handler.ResourceNotFoundException;
import com.chefsphere.ums.repository.CreatorRepo;
import com.chefsphere.ums.repository.FoodieRepo;
import com.chefsphere.ums.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FoodieServiceImpl implements FoodieService {

	// dependencies
	private final FoodieRepo foodie_repo;
	private final CreatorRepo creatorRepo;
	private final ModelMapper mapper;
	private final JwtUtils jwtUtils;

	@Override
	public void updateFoodie(Foodie changedFoodie) {
		Foodie f = foodie_repo.save(changedFoodie);

		if (f == null) {
			throw new InvalidDetailsException("Invalid Foodie credentials");
		}
	}

	@Override
	public Long addFoodie(Foodie newFoodie) {
		Foodie f = foodie_repo.save(newFoodie);
		if (f == null) {
			throw new InvalidDetailsException("Invalid Foodie credentials");
		}
		return f.getUserId().getId();
	}

	@Override
	public Foodie findById(Long id) {
		Optional<Foodie> f = foodie_repo.findById(id);
		if (f.isPresent()) {
			return f.get();
		}
		throw new ResourceNotFoundException("Foodie Id doesn't exist");
	}

	@Override
	public Foodie findByIdWithCreators(Long foodie_id) {
		Optional<Foodie> f = foodie_repo.findByIdWithCreators(foodie_id);
		if (f.isPresent()) {
			return f.get();
		}
		throw new ResourceNotFoundException("Foodie Id doesn't exist");
	}

	private Foodie helperFindByUserIdWithCreators(Long UserId) {
		Optional<Foodie> f = foodie_repo.findByUserIdWithCreators(UserId);
		if (f.isPresent()) {
			return f.get();
		}
		throw new ResourceNotFoundException("Foodie Id doesn't exist");
	}
	
	@Override
	public Creator findCreatorWithFoodies(Long id) throws RuntimeException {
		Optional<Creator> c = creatorRepo.findByIdWithFoodies(id);
		if (c.isPresent()) {
			return c.get();
		}
		throw new RuntimeException("Creator Id doesn't exist");
	}

	@Override
	public List<FoodieDetailsDto> findAll() {
		List<Foodie> f = foodie_repo.findAll();
		if (!(f.isEmpty())) {
			return f.stream().map(m -> {
				Long fid = m.getFid();
				FoodieDetailsDto mappedToDto = mapper.map(m.getUserId(), FoodieDetailsDto.class);
				mappedToDto.setFid(fid);
				return mappedToDto;
			}).collect(Collectors.toList());
		}
		throw new NoContentException("No such foodie exists");
	}

	@Override
	public Long followCreator(HttpServletRequest req, Long creator_id) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		// find foodie by user id
		Foodie f = helperFindByUserIdWithCreators(Userid);

		Long fid = f.getFid();

		if (f.getCreators().stream().anyMatch(s -> s.getCid() == (creator_id))) {
			throw new FoodieConflictException("Foodie is already following creator: " + creator_id);
		}

		Creator c = findCreatorWithFoodies(creator_id);
		// insert creator to set or following list
		f.getCreators().add(c);

		// commit changes
		updateFoodie(f);

		return fid;
	}

	@Override
	public Long unfollowCreator(HttpServletRequest req, Long creator_id) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		// find creator by user id
		Foodie f = helperFindByUserIdWithCreators(Userid);

		Long fid = f.getFid();
		
		Optional<Creator> c = f.getCreators()
			    .stream()
			    .filter(s -> s.getCid()==creator_id)
			    .findAny();

		if (c.isPresent()) {

			f.getCreators().remove(c.get());

			// commit changes
			updateFoodie(f);

			return fid;

		}
		throw new FoodieConflictException("Foodie doesn't follow creator: " + creator_id);
	}

	@Override
	public Long whetherfollowCreator(HttpServletRequest req, Long creator_id) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		// find creator by user id
		Foodie f = helperFindByUserIdWithCreators(Userid);

		Long fid = f.getFid();

		if (f.getCreators().stream().anyMatch(s -> s.getCid() == (creator_id))) {

			f = null;

			return fid;

		}
		throw new FoodieConflictException("Foodie doesn't follow creator: " + creator_id);
	}

	@Override
	public List<CreatorDetailsDto> allFollowing(HttpServletRequest req) {
		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long Userid = jwtUtils.extractUserId(token);

		// find creator by user id
		Foodie f = helperFindByUserIdWithCreators(Userid);
		
		if(f.getCreators().isEmpty()) {
			throw new NoContentException("Foodie doesnt follow any one");
		}
		return f.getCreators().stream().map(c->{
			CreatorDetailsDto cdd = mapper.map(c.getUserId(),CreatorDetailsDto.class);
			cdd.setCid(c.getCid());
			return cdd;
		}
		).toList();
	}
}
