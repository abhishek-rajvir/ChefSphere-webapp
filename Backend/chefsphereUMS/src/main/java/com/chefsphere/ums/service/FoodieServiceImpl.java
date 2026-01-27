package com.chefsphere.ums.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.FoodieResponseDTO;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.Foodie;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.exception_handler.InvalidDetailsException;
import com.chefsphere.ums.exception_handler.InvalidIdException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.repository.CreatorRepo;
import com.chefsphere.ums.repository.FoodieRepo;
import com.chefsphere.ums.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
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

	@Transactional
	@Override
	public String createFoodie(User u) {
		Foodie f = new Foodie();
		f.setUserId(u);
		foodieRepo.save(f);
		return "Welcome " + u.getFirstName() + "SignUp successfull";
	}

	@Override
	public Foodie findById(Long id) {
		return foodieRepo.findById(id).orElseThrow(() -> new InvalidIdException("Foodie Id doesn't exist"));
	}

	@Override
	public FoodieResponseDTO findByIdDto(Long id) {
		return foodieRepo.findById(id).map(s -> mapper.map(s, FoodieResponseDTO.class))
				.orElseThrow(() -> new InvalidIdException("Foodie Id doesn't exist"));
	}

	@Override
	public Foodie findById(HttpServletRequest req) {
		Long uid = jwtUtils.extractUidFromReq(req);
		return foodieRepo.findByUserId_IdAndUserId_IsActiveTrue(uid)
				.orElseThrow(() -> new InvalidIdException("Foodie Id doesn't exist"));
	}

	@Override
	public FoodieResponseDTO findByIdDto(HttpServletRequest req) {
		Long uid = jwtUtils.extractUidFromReq(req);
		return foodieRepo.findByUserId_IdAndUserId_IsActiveTrue(uid).map(s -> mapper.map(s, FoodieResponseDTO.class))
				.orElseThrow(() -> new InvalidIdException("Foodie Id doesn't exist"));
	}

	@Override
	public Foodie findByIdWithCreators(Long foodie_id) {
		return foodieRepo.findByIdWithCreators(foodie_id)
				.orElseThrow(() -> new InvalidIdException("Foodie Id doesn't exist"));
	}

	@Override
	public Foodie findByUserIdWithCreators(Long UserId) {
		return foodieRepo.findByUserIdWithCreators(UserId)
				.orElseThrow(() -> new InvalidIdException("Foodie Id doesn't exist"));
	}

	@Override
	public Creator findCreatorWithFoodies(Long id) throws RuntimeException {
		return creatorRepo.findByIdWithFoodies(id)
				.orElseThrow(() -> new InvalidIdException("Creator Id doesn't exist"));
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

}