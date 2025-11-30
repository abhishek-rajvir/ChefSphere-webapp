package com.healthcare.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@ToString
@Table(name = "recipes")
public class Recipe {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long recipeId;
	
	private String recipeName;
	
	private String description;
	
	private Integer prep_time;
	
	private Integer number_of_servings;
	
//	// One recipe has many steps
	@OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)
	private List<RecipeSteps> steps_required = new ArrayList<>();	
	
	
//	// One recipe has many ingredients
	@OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Ingredients> ingredients_required = new ArrayList<>();	
	
	@Lob
	private byte[] image;
	
	// one recipe has one category
	@OneToOne(
			// name of the owner in foodcategory entity
			mappedBy = "recipe",fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)
	private FoodCategory categories;
	
//	// one post has one recipe
//	@OneToOne( mappedBy = "recipe", cascade = CascadeType.ALL)
//	@JoinColumn( name = "post_id") // fk is stored here	
//	private Post post;

	
//	 helper method
	public void addIngredient(Ingredients ingredients) {
		ingredients_required.add(ingredients);
	}
	
	public List<Ingredients> getAllIngredients(){
		return ingredients_required;
	}
	
	
	public void removeIngredient(Ingredients ingredients) {
		ingredients_required.remove(ingredients);
	}
	
//	public void setFoodCategory(FoodCategory fc) {
//		setCategories(fc);
//		fc.setRecipe(this);
//	}
//	
//	public void removeFoodCategory(FoodCategory fc) {
//		setCategories(null);
//		fc.setRecipe(null);
//	}
}
