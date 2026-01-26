package com.chefsphere.ums.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class IngredientsRequestDTO {	
	private String name;
	
	private String description;
	
	private Double Qty;
	
	private String unit;
}
