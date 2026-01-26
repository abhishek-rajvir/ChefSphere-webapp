package com.chefsphere.ums.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.FoodieResponseDTO;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.Foodie;
import com.chefsphere.ums.entities.User;
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
	private final FoodieRepo foodieRepo;
	private final CreatorRepo creatorRepo;
	private final ModelMapper mapper;
	private final JwtUtils jwtUtils;

	@Override
	public void updateFoodie(Foodie changedFoodie) {
		Foodie f = foodieRepo.save(changedFoodie);

		if (f == null) {
			throw new InvalidDetailsException("Invalid Foodie credentials");
		}
	}

	@Override
	public String createFoodie(User user) {
		Foodie f = new Foodie();
		f.setUserId(user);
		foodieRepo.save(f);
		return "Welcome " + user.getFirstName() + "SignUp successfull";
	}

	@Override
	public Foodie findById(Long id) {
		Optional<Foodie> f = foodieRepo.findById(id);
		if (f.isPresent()) {
			return f.get();
		}
		throw new ResourceNotFoundException("Foodie Id doesn't exist");
	}

	@Override
	public Foodie findByIdWithCreators(Long foodie_id) {
		Optional<Foodie> f = foodieRepo.findByIdWithCreators(foodie_id);
		if (f.isPresent()) {
			return f.get();
		}
		throw new ResourceNotFoundException("Foodie Id doesn't exist");
	}

	@Override
	public Foodie findByUserIdWithCreators(Long UserId) {
		Optional<Foodie> f = foodieRepo.findByUserIdWithCreators(UserId);
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
	public List<FoodieResponseDTO> findAll() {
		List<Foodie> f = foodieRepo.findAll();
		if (!(f.isEmpty())) {
			return f.stream().map(m -> {
				Long fid = m.getFid();
				FoodieResponseDTO mappedToDto = mapper.map(m.getUserId(), FoodieResponseDTO.class);
				mappedToDto.setFid(fid);
				return mappedToDto;
			}).collect(Collectors.toList());
		}
		throw new NoContentException("No such foodie exists");
	}

	// get logged foodie
	@Override
	public Foodie findById(HttpServletRequest req) {
		// get user id
		Long uid = jwtUtils.extractUidFromReq(req);

		Optional<Foodie> f = foodieRepo.findByUserId_IdAndUserId_IsActiveTrue(uid);
		if (f.isPresent()) {
			return f.get();
		}
		throw new ResourceNotFoundException("Foodie Id doesn't exist");
	}

}
