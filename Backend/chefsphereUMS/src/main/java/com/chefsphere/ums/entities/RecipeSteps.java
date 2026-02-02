package com.chefsphere.ums.entities;

import jakarta.persistence.*;
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
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id") // Foreign key column
	private Recipe recipe;


}
