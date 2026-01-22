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

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CreatorServiceImpl implements CreatorService {
	
	// dependencies
	private final CreatorRepo creator_repo;
//	private final PostRepo post_repo;
	private final ModelMapper mapper;

	@Override
	public Long addCreator(Creator newCreator) {
		Creator c = creator_repo.save(newCreator);
		
		if(c==null){
			throw new InvalidDetailsException("Invalid Creator credentials");
		}
		return c.getUserId().getId();
	}

	@Override
	public void updateCreator(Creator changedCreator) throws Exception {
		Creator c = creator_repo.save(changedCreator);
		
		if(c==null){
			throw new RuntimeException("Invalid Creator credentials");
		}
	}

	@Override
	public Creator findById(Long id) {
		Optional<Creator> c = creator_repo.findById(id);
		if(c.isPresent()) {
			return c.get();
		}
		throw new ResourceNotFoundException("Creator Id doesn't exist");
	}
	
	@Override
	public Creator findByUserId(Long id) {
		Optional<Creator> c = creator_repo.findByUserId(id);
		if(c.isPresent()) {
			return c.get();
		}
		throw new ResourceNotFoundException("Creator Id doesn't exist");
	}


	@Override
	public List<CreatorDetailsDto> findAll() {
		List<Creator> c = creator_repo.findAll();
		if(!(c.isEmpty())) {
			return c.stream()
					.map(m -> {
			        	Long cid = m.getCid();
			        	CreatorDetailsDto mappedToDto = mapper.map(m.getUserId(), CreatorDetailsDto.class);
			        	mappedToDto.setC_id(cid);
			        	return mappedToDto;
			        })
			        .collect(Collectors.toList());
		}
		throw new NoContentException("No such creator exists");
	}

	@Override
	public List<FoodieDetailsDto> getFollowersById(Long creator_id) {
		Optional<Creator> c = creator_repo.findByIdWithFoodies(creator_id);
		if(c.isPresent()) {
			return c.get().getFoodies()
					.stream()
					.map(f -> mapper.map(f, FoodieDetailsDto.class)).toList();
		}
		throw new ResourceNotFoundException("Creator ID:"+creator_id+" doesnt exists");
	}
	
	@Override
	public List<CreatorRandomDto> findRandomCreatorByQty(Long qty){
		Pageable pageable = PageRequest.of(0, qty.intValue());
		List<CreatorRandomDto> cList = creator_repo.findCreators(pageable);
		if(cList!=null||!cList.isEmpty() ) {
			return cList;
		}
		throw new ResourceNotFoundException("No creators in db");
	}
	
}

