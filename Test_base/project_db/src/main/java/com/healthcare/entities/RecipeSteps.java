package com.healthcare.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "recipe")
public class RecipeSteps {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long step_no;
	
	private String step_name;

	// allows storing large contents of data
	@Lob
	private String Content;
	private String img_url;
	
	@ManyToOne 
    @JoinColumn(name = "recipe_id") // Foreign key column
	private Recipe recipe;


}
