package com.healthcare.entities;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long recipe_id;
	
	private String recipe_name;
	
	@Column(unique = true)
	private String procedure_filename;
	
	private String description;
	
	private String category;
	
	@DateTimeFormat
	private LocalTime prep_time;
	
	private Integer number_of_servings;
	
	// One recipe has many ingredients
	@OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)
	private Set<Ingredients> ingredients_required = new HashSet<>();	
	
	@Lob
	private byte[] image;
	
}
