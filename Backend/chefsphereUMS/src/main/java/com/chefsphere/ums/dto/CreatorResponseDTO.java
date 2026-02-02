package com.chefsphere.ums.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreatorResponseDTO {

	private Long cid;
		
	private Long uid;
	
	private String firstName;
	
	private String lastName;
	
	private String username;
	
	private String email;
	
	private String gender;

	private String pic;
}
