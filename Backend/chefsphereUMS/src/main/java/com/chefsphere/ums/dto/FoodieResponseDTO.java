package com.chefsphere.ums.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class FoodieResponseDTO {

	private Long fid;
	
	private String firstName;
	
	private String lastName;
	
	private String username;
	
	private String email;
	
	private String gender;

}
