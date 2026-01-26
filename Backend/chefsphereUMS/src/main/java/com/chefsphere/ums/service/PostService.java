package com.chefsphere.ums.service;

import java.util.List;

import com.chefsphere.ums.dto.PostRequestDTO;
import com.chefsphere.ums.dto.PostResponseDTO;
import com.chefsphere.ums.entities.Creator;

import jakarta.servlet.http.HttpServletRequest;

public interface PostService {

	void createPost(PostRequestDTO vdto, HttpServletRequest req);

	List<PostResponseDTO> findAllByUserId(Long creatorId);

	List<PostResponseDTO> findAllByUserId(HttpServletRequest req);

	String deletePost(Creator c);
}
