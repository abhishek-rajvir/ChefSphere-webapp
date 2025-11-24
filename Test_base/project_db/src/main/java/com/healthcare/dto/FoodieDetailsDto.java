package com.healthcare.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class FoodieDetailsDto {

	private Long f_id;
	
	private String firstName;
	
	private String lastName;
	
	private String username;
	
	private String email;
	
	private String gender;

}
