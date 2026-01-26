package com.chefsphere.ums.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chefsphere.ums.dto.UserSignUpDto;
import com.chefsphere.ums.dto.UserUpdateDto;
import com.chefsphere.ums.entities.Creator;
import com.chefsphere.ums.entities.User;
import com.chefsphere.ums.service.CreatorService;
import com.chefsphere.ums.service.PostService;
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
	private final PostService postService ;
	private final CreatorService creatorService ;

	@GetMapping("/{id}")
	public ResponseEntity<?> findCreatorById(@PathVariable Long id)
	{		
		return ResponseEntity.ok(creatorService.findByUserId(id));
	}

	@GetMapping("/listAll")
	public ResponseEntity<?> listAll(){
		creatorService.findAll().forEach(s->System.out.println(s));
		return ResponseEntity.ok(creatorService.findAll());
	
	}
	
	@PostMapping("/signUp")
	public ResponseEntity<?> newCreator(@Valid @RequestBody UserSignUpDto dto){
		// create new user
		User u = userService.createUser(1,dto);
		return ResponseEntity.ok(creatorService.createCreator(u));
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateCreator(HttpServletRequest req,@Valid @RequestBody UserUpdateDto dto)
	{		
		Creator c = creatorService.findById(req);
		return ResponseEntity.ok(userService.updateUserDetails(c.getUserId(),dto));	
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteCreator(HttpServletRequest req)
	{		
		Creator c = creatorService.findById(req);
		String msg1 = postService.deletePost(c);
		String msg2 = userService.deleteUser(c.getUserId());
		return ResponseEntity.ok(msg1+"\n"+msg2);	
	}
	

	@GetMapping("/list/creatorRange/{qty}")
	public ResponseEntity<?> findCreatorByRange(@PathVariable Long qty) {
		return ResponseEntity.ok(creatorService.findRandomCreatorByQty(qty));
	}

	
}
