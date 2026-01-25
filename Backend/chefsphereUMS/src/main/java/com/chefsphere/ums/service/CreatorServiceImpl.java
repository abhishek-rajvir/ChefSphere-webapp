package com.chefsphere.ums.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.CreatorDetailsDto;
import com.chefsphere.ums.dto.CreatorRandomDto;
import com.chefsphere.ums.dto.FoodieDetailsDto;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.exception_handler.InvalidDetailsException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.exception_handler.ResourceNotFoundException;
import com.chefsphere.ums.repository.CreatorRepo;
import com.chefsphere.ums.security.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CreatorServiceImpl implements CreatorService {

	// dependencies
	private final CreatorRepo creatorRepo;
	private final JwtUtils jwtUtils;
	private final ModelMapper mapper;

	@Override
	public Long addCreator(Creator newCreator) {
		Creator c = creatorRepo.save(newCreator);

		if (c == null) {
			throw new InvalidDetailsException("Invalid Creator credentials");
		}
		return c.getUserId().getId();
	}

	@Override
	public void updateCreator(Creator changedCreator) throws Exception {
		Creator c = creatorRepo.save(changedCreator);

		if (c == null) {
			throw new RuntimeException("Invalid Creator credentials");
		}
	}

	@Override
	public Creator findById(Long id) {
		Optional<Creator> c = creatorRepo.findById(id);
		if (c.isPresent()) {
			return c.get();
		}
		throw new ResourceNotFoundException("Creator Id doesn't exist");
	}

	@Override
	public Creator findByUserId(Long id) {
		Optional<Creator> c = creatorRepo.findByUserId(id);
		if (c.isPresent()) {
			return c.get();
		}
		throw new ResourceNotFoundException("Creator Id doesn't exist");
	}

	@Override
	public List<CreatorDetailsDto> findAll() {
		List<Creator> c = creatorRepo.findAll();
		if (!(c.isEmpty())) {
			return c.stream().map(m -> {
				Long cid = m.getCid();
				CreatorDetailsDto mappedToDto = mapper.map(m.getUserId(), CreatorDetailsDto.class);
				mappedToDto.setCid(cid);
				return mappedToDto;
			}).collect(Collectors.toList());
		}
		throw new NoContentException("No such creator exists");
	}

	@Override
	public Long totalFollowers(Long cid) {
		// find creator by user id
		Optional<Creator> c = creatorRepo.findByIdWithFoodies(cid);
		if (c.isPresent()) {
			return (long) c.get().getFoodies().size();
		}
		throw new ResourceNotFoundException("Creator ID:" + c.get().getCid() + " doesnt exists");
	}

	@Override
	public List<FoodieDetailsDto> getFollowersById(HttpServletRequest req) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		Long uid = jwtUtils.extractUserId(token);

		// find creator by user id
		Optional<Creator> c = creatorRepo.findByUserIdWithFoodies(uid);
		if (c.isPresent()) {
			return c.get().getFoodies().stream().map(f -> {
				FoodieDetailsDto fd = mapper.map(f.getUserId(), FoodieDetailsDto.class);
				fd.setFid(f.getFid());
				return fd;
			}).toList();
		}
		throw new ResourceNotFoundException("Creator ID:" + c.get().getCid() + " doesnt exists");
	}

	@Override
	public List<CreatorRandomDto> findRandomCreatorByQty(Long qty) {
		Pageable pageable = PageRequest.of(0, qty.intValue());
		List<CreatorRandomDto> cList = creatorRepo.findCreators(pageable);
		if (cList != null || !cList.isEmpty()) {
			return cList;
		}
		throw new ResourceNotFoundException("No creators in db");
	}

//	private Creator helperFindByUserIdWithFoodies(Long UserId) {
//		Optional<Creator> c = creatorRepo.findByUserIdWithFoodies(UserId);
//		if (c.isPresent()) {
//			return c.get();
//		}
//		throw new ResourceNotFoundException("Creator Id doesn't exist");
//	}

}
