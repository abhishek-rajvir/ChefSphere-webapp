package com.chefsphere.ums.controller;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.ApiResponse;
import com.chefsphere.ums.dto.CreatorSignUpDto;
import com.chefsphere.ums.dto.FoodieUpdateDto;
import com.chefsphere.ums.entities.Foodie;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.entities.UserType;
import com.chefsphere.ums.exception_handler.ResourceAlreadyExistsException;
import com.chefsphere.ums.service.FoodieService;
import com.chefsphere.ums.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/foodies")
@RequiredArgsConstructor
public class FoodieController {

	// dependencies		

	private final UserService userService;
	private final FoodieService foodieService ;
	private final ModelMapper modelMapper;


	@GetMapping("/listAll")
	public ResponseEntity<?> listAll(){
		return ResponseEntity.ok(foodieService.findAll());
	}
	

	@PostMapping("/{id}/updateDetails")
	public ResponseEntity<?> updateFoodie(@PathVariable Long id,@Valid @RequestBody FoodieUpdateDto dto)
	{
		Foodie f = foodieService.findById(id);
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
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<String>("Updated "+str.substring(0, str.length()-1),true,"Update successfull"));
		}
		else {
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<String>("No distint credentials were provided",false,"No update"));
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
			newUser.setType(UserType.FOODIE);
			Foodie newFoodie = new Foodie();
			newFoodie.setUserId(newUser);
			userService.encryptPassword(foodieService.addFoodie(newFoodie));
			return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<String>("Welcome "+dto.getFirstName(),true,"SignUp successfull"));				
		}
		else {
			throw new ResourceAlreadyExistsException("Creator id should be unique");
		}
	}

	@PostMapping("/followCreator/{creator_id}")
	public ResponseEntity<?> followCreator(HttpServletRequest req, @PathVariable Long creator_id){			
		// get persistant foodie by id
		long fid = foodieService.followCreator(req,creator_id);
		
		return ResponseEntity.ok("Foodie: "+fid+" now follows Creator: "+creator_id);
		
	}
	
	@DeleteMapping("/unFollowCreator/{creator_id}")
	public ResponseEntity<?> unfollowCreator(HttpServletRequest req, @PathVariable Long creator_id){
		// get persistant foodie by id
		long fid = foodieService.unfollowCreator(req,creator_id);
		return ResponseEntity.ok("Foodie: "+fid+" has unfollowed Creator: "+creator_id);
	}
	
	@GetMapping("/doesFollow/{creator_id}")
	public ResponseEntity<?> whetherfollowCreator(HttpServletRequest req, @PathVariable Long creator_id){
		// get persistant foodie by id
		long fid = foodieService.whetherfollowCreator(req,creator_id);
		return ResponseEntity.ok("Foodie: "+fid+" does follow Creator: "+creator_id);
	}
	
	
}
