package com.chefsphere.ums.service;

import com.chefsphere.ums.dto.CommentRequestDTO;
import com.chefsphere.ums.dto.CommentResponseDTO;
import com.chefsphere.ums.entities.Comment;
import com.chefsphere.ums.entities.Post;
import com.chefsphere.ums.exception_handler.InvalidIdException;
import com.chefsphere.ums.exception_handler.NoContentException;
import com.chefsphere.ums.repository.CommentRepo;
import com.chefsphere.ums.repository.PostRepo;
import com.chefsphere.ums.security.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final PostRepo postRepo;
	private final CommentRepo commentRepo;
	private final JwtUtils jwtUtils;
	private final ModelMapper mapper;

	@Override
	public void createComment(CommentRequestDTO c_dto, HttpServletRequest req) {
		
		// get token
		String token = jwtUtils.extractToken(req);
		
		// get user id
		String uname = jwtUtils.extractUsername(token);
		
		String type = jwtUtils.extractRole(token);
		// find creator by user id
		
		Optional<Post> p = postRepo.findById(c_dto.getPostId());
		
		if (p.isEmpty()) {
			throw new InvalidIdException("Post id " + c_dto.getPostId() + " doesnt exists");
		}
		Comment newComment = mapper.map(c_dto, Comment.class);
		
		newComment.setPost(p.get());
		System.out.println(type);
		if(type.equalsIgnoreCase("CREATOR") ){
			newComment.setAuthorName(uname+"[‍🧑‍🍳]");			
		}
		else {
			newComment.setAuthorName(uname);			
		}
		
		Comment persistentComment = commentRepo.save(newComment);
		
		p.get().addComment(persistentComment);
		postRepo.save(p.get());
		
	}
	@Override
	public void createCommentAuthor(CommentRequestDTO c_dto, HttpServletRequest req) {

		// get token
		String token = jwtUtils.extractToken(req);

		// get user id
		String uname = jwtUtils.extractUsername(token).split("@")[0];
		
		// find creator by user id

		Optional<Post> p = postRepo.findById(c_dto.getPostId());

		if (p.isEmpty()) {
			throw new InvalidIdException("Post id " + c_dto.getPostId() + " doesnt exists");
		}
		Comment newComment = mapper.map(c_dto, Comment.class);

		newComment.setPost(p.get());
		newComment.setAuthorName(uname);

		Comment persistentComment = commentRepo.save(newComment);

		p.get().addComment(persistentComment);
		postRepo.save(p.get());

	}

	@Override
	public void deleteCommentById(Long commentId) {

		Optional<Comment> c = commentRepo.findById(commentId);
		if (c.isEmpty()) {
			throw new InvalidIdException("Comment id " + commentId + " doesnt exists");
		}
		Post p = c.get().getPost();
		p.removeComment(c.get());
		postRepo.save(p);
		commentRepo.delete(c.get());

	}

	@Override
	public List<CommentResponseDTO> findAllCommentByPostId(Long pid) {
		List<Comment> comList = commentRepo.findByPost_Pid(pid);
		if (comList.isEmpty() || comList == null) {
			throw new NoContentException("Post has no comments");
		}
		return comList.stream().map(c -> {
			CommentResponseDTO cdto = mapper.map(c, CommentResponseDTO.class);
			cdto.setPostId(pid);
			return cdto;
		}).toList();
	}
}
