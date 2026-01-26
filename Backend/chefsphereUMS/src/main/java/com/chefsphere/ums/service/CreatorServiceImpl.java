package com.chefsphere.ums.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.chefsphere.ums.dto.CreatorDetailsDTO;
import com.chefsphere.ums.dto.CreatorRandomDTO;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.exception_handler.InvalidCredentialsException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.exception_handler.UserNotFoundException;
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
	public String createCreator(User user) {
		Creator c = new Creator();
		c.setUserId(user);
		creatorRepo.save(c);
		return "Welcome " + user.getFirstName()+ "SignUp successfull";
	}

	@Override
	public void updateCreator(Creator changedCreator) {
		Creator c = creatorRepo.save(changedCreator);

		if (c == null) {
			throw new InvalidCredentialsException("Invalid Creator credentials");
		}
	}

	// get logged creator
	@Override
	public Creator findById(HttpServletRequest req) {
		// get user id
		Long uid = jwtUtils.extractUidFromReq(req);
		
		Optional<Creator> c = creatorRepo.findByUserId_IdAndUserId_IsActiveTrue(uid);
		if (c.isPresent()) {
			return c.get();
		}
		throw new UserNotFoundException("Creator Id doesn't exist");
	}

	@Override
	public Creator findById(Long id) {
		
		Optional<Creator> c = creatorRepo.findById(id);
		if (c.isPresent()) {
			return c.get();
		}
		throw new UserNotFoundException("Creator Id doesn't exist");
	}

	@Override
	public Creator findByUserId(Long cid) {
		Optional<Creator> c = creatorRepo.findByUserId_IdAndUserId_IsActiveTrue(cid);
		if (c.isPresent()) {
			return c.get();
		}
		throw new UserNotFoundException("Creator Id doesn't exist");
	}

	@Override
	public List<CreatorDetailsDTO> findAll() {
		List<Creator> c = creatorRepo.findAll();
		if (!(c.isEmpty())) {
			return c.stream().map(m -> {
				Long cid = m.getCid();
				CreatorDetailsDTO mappedToDto = mapper.map(m.getUserId(), CreatorDetailsDTO.class);
				mappedToDto.setCid(cid);
				return mappedToDto;
			}).collect(Collectors.toList());
		}
		throw new NoContentException("No such creator exists");
	}

	@Override
	public List<CreatorRandomDTO> findRandomCreatorByQty(Long qty) {
		Pageable pageable = PageRequest.of(0, qty.intValue());
		List<CreatorRandomDTO> cList = creatorRepo.findCreators(pageable);
		if (cList != null && !cList.isEmpty()) {
			return cList;
		}
		throw new NoContentException("No creators in db");
	}
}
