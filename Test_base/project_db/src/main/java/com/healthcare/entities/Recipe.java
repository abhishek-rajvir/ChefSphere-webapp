package com.healthcare.entities;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "recipes")
@ToString(exclude = {"ingredients","comments"})
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long recipe_id;
	
	private String recipe_title;
	
	@Column(columnDefinition="TEXT")
	private String description;
	
	private String category;
	
	private Integer prep_time;
	
	private Integer number_of_servings;
	
	// One recipe has many ingredients
	@OneToMany(mappedBy = "recipes", cascade = CascadeType.ALL, orphanRemoval = true) // if creator is deleted so are his posts
	@JsonManagedReference
	@JsonBackReference
	private List<Ingredient> ingredients = new ArrayList<>();
	
//	@Column(columnDefinition="BYTEA")
	private String image_url;
	
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
}
