package com.chefsphere.ums.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreatorDetailsDTO {

	private Long cid;
		
	private String firstName;
	
	private String lastName;
	
	private String username;
	
	private String email;
	
	private String gender;

	
}
