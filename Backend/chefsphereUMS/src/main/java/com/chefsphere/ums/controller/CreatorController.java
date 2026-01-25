package com.chefsphere.ums.controller;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.ApiResponse;
import com.chefsphere.ums.dto.CreatorSignUpDto;
import com.chefsphere.ums.dto.CreatorUpdateDto;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.entities.UserType;
import com.chefsphere.ums.exception_handler.ResourceAlreadyExistsException;
import com.chefsphere.ums.service.CreatorService;
import com.chefsphere.ums.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/creators")
@AllArgsConstructor

public class CreatorController {
	
	// dependencies		

	private final UserService userService;
	private final CreatorService creatorService ;
	private final ModelMapper modelMapper;

	@GetMapping("/listAll")
	public ResponseEntity<?> listAll(){
		creatorService.findAll().forEach(s->System.out.println(s));
		return ResponseEntity.ok(creatorService.findAll());
	
	}

	@PostMapping("/{id}/updateDetails")
	public ResponseEntity<?> updateCreator(@PathVariable Long id,@Valid @RequestBody CreatorUpdateDto dto)
	{		
		Creator f = creatorService.findById(id);
		User u = userService.findById(f.getUserId().getId());
		String str = "";
		
		if(dto.getEmail()!=null) {
			u.setEmail(dto.getEmail());
			str+=" email,";
		}
		if(dto.getFirstName()!=null) {
			u.setFirstName(dto.getFirstName());
			str+=" firstname,";
		}
		if(dto.getGender()!=null) {
			u.setGender(dto.getGender());
			str+=" gender,";
		}
		if(dto.getLastName()!=null) {
			u.setLastName(dto.getLastName());
			str+=" lastname,";
		}
		if(dto.getPassword()!=null) {
			u.setPassword(dto.getPassword());
			str+=" password,";
		}
		if(dto.getUsername()!=null) {
			u.setUsername(dto.getUsername());
			str+=" username,";
		}
		
		userService.updateUser(u);

		// encrypt the updated password
		userService.encryptPassword(id);
		
		if(str.length()>0) {				
			return ResponseEntity.ok(new ApiResponse<String>("Updated "+str.substring(0, str.length()-1),true,"Update successfull"));
		}
		else {
			return ResponseEntity.ok(new ApiResponse<String>("No distint credentials were provided",false,"No update"));
		}
	}

	
	@PostMapping("/signUp")
	public ResponseEntity<?> newCreator(@Valid @RequestBody CreatorSignUpDto dto){
			
		// validate email
		if(userService.emailExist(dto.getEmail())) {
			throw new RuntimeException("Email id should be unique");				
		}
				
		// validate creator name
		if(!userService.ifExist(dto.getUsername())) {				
			User newUser = modelMapper.map(dto, User.class);
			newUser.setType(UserType.CREATOR);
			Creator newCreator = new Creator();
			newCreator.setUserId(newUser);
			userService.encryptPassword(creatorService.addCreator(newCreator));
			return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<String>("Welcome "+dto.getFirstName(),true,"SignUp successfull"));				
		}
		else {
			throw new ResourceAlreadyExistsException("Creator id should be unique");
		}
	}
	
	
	@GetMapping("/followers")
	public ResponseEntity<?> getFollowers(HttpServletRequest req){
		return ResponseEntity.ok(
			Map.of("foodies",creatorService.getFollowersById(req))
		);
	}
	
	@GetMapping("/list/creatorRange/{qty}")
	public ResponseEntity<?> findCreatorByRange(@PathVariable Long qty) {
		return ResponseEntity.ok(creatorService.findRandomCreatorByQty(qty));
	}
	
	@GetMapping("/totalfollowers/{creator_id}")
	public ResponseEntity<?> allfollowersCreator(Long cid){
		// get persistant foodie by id
		return ResponseEntity.ok(creatorService.totalFollowers(cid));
	}
	
}
