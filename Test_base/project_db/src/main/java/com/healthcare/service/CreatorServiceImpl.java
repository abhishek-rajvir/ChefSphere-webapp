package com.healthcare.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.CreatorDetailsDto;
import com.healthcare.dto.PostResponseDto;
import com.healthcare.entities.Creator;
import com.healthcare.entities.Post;
import com.healthcare.exception_handler.InvalidDetailsException;
import com.healthcare.exception_handler.NoContentException;
import com.healthcare.exception_handler.ResourceNotFoundException;
import com.healthcare.repository.CreatorRepo;
import com.healthcare.repository.PostRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CreatorServiceImpl implements CreatorService {

	// dependencies
	private final CreatorRepo creator_repo;
	private final PostRepo post_repo;
	private final ModelMapper mapper;

	@Override
	public void addCreator(Creator newCreator) {
		Creator c = creator_repo.save(newCreator);
		
		if(c==null){
			throw new InvalidDetailsException("Invalid Creator credentials");
		}
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
	public List<CreatorDetailsDto> findAll() {
		List<Creator> c = creator_repo.findAll();
		if(!(c.isEmpty())) {
			return c.stream()
					.map(m -> {
			        	Long cid = m.getC_id();
			        	CreatorDetailsDto mappedToDto = mapper.map(m.getUserId(), CreatorDetailsDto.class);
			        	mappedToDto.setC_id(cid);
			        	return mappedToDto;
			        })
			        .collect(Collectors.toList());
		}
		throw new NoContentException("No such creator exists");
	}
	

	@Override
	public void newPost(Post p,Long Creator_id) {

		Optional<Creator> c2 = creator_repo.findByIdWithPosts(Creator_id);
		if(c2.isPresent()) {
			c2.get().addPost(p);
			post_repo.save(p);
			creator_repo.save(c2.get());
		}
		else {
			throw new ResourceNotFoundException("Creator "+Creator_id+" doesnt exist");
		}
	}
	
	public List<PostResponseDto> listOfPost(Long Creator_id){
		
		Optional<Creator> c = creator_repo.findByIdWithPosts(Creator_id);
		if(c.isPresent()) {			
			List<Post> list = c.get().getAllPost();
			if(list == null) {
				throw new ResourceNotFoundException("Creator "+Creator_id+" has no posts");
			}
			else {
				return list.stream().map(p->(mapper.map(p,PostResponseDto.class))).toList();
			}
		}
		else {
			throw new ResourceNotFoundException("Creator "+Creator_id+" doesnt exist");
		}
	}

	@Override
	public ApiResponse<String> deletePostById(Long cid, Long pid) {
		
		// reference obj of post
		Optional<Post> p = post_repo.findById(pid);
		if(p.isPresent()) {
			// find the creator by id and also fetch his posts
			Optional<Creator> c = creator_repo.findByIdWithPosts(cid);
			if(c.isPresent()) {				
				// delete specific post
				c.get().removePost(p.get());
				post_repo.delete(p.get());
				return new ApiResponse<>("Post "+pid+" deleted", true, "delete success"); 
			}
			else {
				throw new ResourceNotFoundException("Creator "+cid+" doesnt exist");
			}

		}
		else {
			throw new ResourceNotFoundException("Post "+pid+" doesnt exist");
		}
		
	}
	
	
}

