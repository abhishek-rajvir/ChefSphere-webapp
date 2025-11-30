package com.healthcare.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class IngredientsRequestDto {	
	private String name;
	private String description;
	private Long Qty;
}
