package com.healthcare.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
public class Ingredients {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String description;
	
	private Long Qty;

	@ManyToOne(fetch = FetchType.LAZY) // Lazy loading is often preferred for performance
    @JoinColumn(name = "recipe_id") // Foreign key column
	private Recipe recipe;

	public Ingredients(String Name,Long qty) {
		name = Name;
		Qty = qty;
	}
}
