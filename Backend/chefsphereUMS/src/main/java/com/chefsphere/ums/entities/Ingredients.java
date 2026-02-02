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
public class Ingredients {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String description;
	
	private Double Qty;
	
	private String unit;

	@ManyToOne(fetch = FetchType.LAZY) // Lazy loading is often preferred for performance
    @JoinColumn(name = "recipe_id") // Foreign key column
	private Recipe recipe;

	public Ingredients(String Name,Double qty) {
		name = Name;
		Qty = qty;
	}
}
