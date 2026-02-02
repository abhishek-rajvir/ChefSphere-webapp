package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.CreatorRandomDTO;
import com.chefsphere.ums.dto.CreatorResponseDTO;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.exception_handler.InvalidCredentialsException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.exception_handler.UserNotFoundException;
import com.chefsphere.ums.repository.CreatorRepo;
import com.chefsphere.ums.security.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CreatorServiceImpl implements CreatorService {

	// dependencies
	private final CreatorRepo creatorRepo;
	private final JwtUtils jwtUtils;
	private final ModelMapper mapper;

	@Override
	public String createCreator(User u) {
		Creator c = new Creator();
		c.setUserId(u);
		creatorRepo.save(c);
		return "Welcome " + u.getFirstName() + "SignUp successfull";
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

		return creatorRepo.findByUserId_IdAndUserId_IsActiveTrue(uid)
				.orElseThrow(() -> new UserNotFoundException("Creator not found for user id: " + uid));
	}

	// get logged creator also fetch posts
	@Override
	public Creator findByIdWithPosts(HttpServletRequest req) {
		// get user id
		Long uid = jwtUtils.extractUidFromReq(req);

		return creatorRepo.findByUserIdWithPosts(uid)
				.orElseThrow(() -> new UserNotFoundException("Creator not found for user id: " + uid));
	}

	@Override
	public Creator findByIdWithPosts(Long cid) {

		return creatorRepo.findByIdWithPosts(cid)
				.orElseThrow(() -> new UserNotFoundException("Creator not found for user id: " + cid));
	}

	@Override
	public CreatorResponseDTO findById(Long cid) {
		return creatorRepo.findByCidAndUserId_IsActiveTrue(cid).map(s -> {
			CreatorResponseDTO cdto = mapper.map(s.getUserId(), CreatorResponseDTO.class);
			cdto.setUid(s.getUserId().getId());
			cdto.setCid(s.getCid());
			return cdto;
		}).orElseThrow(() -> new UserNotFoundException("Creator not found for id: " + cid));
	}

	@Override
	public Creator findByUserId(Long uid) {
		return creatorRepo.findByUserId_IdAndUserId_IsActiveTrue(uid)
				.orElseThrow(() -> new UserNotFoundException("Creator Id doesn't exist with UserId: " + uid));
	}

	@Override
	public List<CreatorResponseDTO> findAll() {
		List<Creator> c = creatorRepo.findAll();
		if (!(c.isEmpty())) {
			return c.stream().map(m -> {
				Long cid = m.getCid();
				CreatorResponseDTO mappedToDto = mapper.map(m.getUserId(), CreatorResponseDTO.class);
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
