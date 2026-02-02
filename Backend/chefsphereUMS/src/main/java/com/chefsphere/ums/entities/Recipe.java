package com.chefsphere.ums.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = { "steps_required", "ingredients_required", "foodCategories" })
@Table(name = "recipes")
public class Recipe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long recipeId;

	private String recipeName;

	private String description;

	private Integer prepTime;

	private Integer number_of_servings;

	// one post has one recipe
	@OneToOne(mappedBy = "recipe", cascade = CascadeType.ALL)
	@JoinColumn(name = "post_id") // fk is stored here
//	@JsonIgnore
	private Post post;

//	// One recipe has many steps
	@OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<RecipeSteps> steps_required = new ArrayList<>();

//	// One recipe has many ingredients
	@OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Ingredients> ingredients_required = new ArrayList<>();

	/*
	 * many recipe have many category Cake - (Dessert + Party Food)
	 */

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	// create additonal table with the given columns at runtime
	@JoinTable(name = "recipe_category_relation", // name of the table
			joinColumns = {

					/*
					 * column name and what it column data it should refer/point it in the column
					 */
					@JoinColumn(name = "recipe_id", referencedColumnName = "recipeId") },

			inverseJoinColumns = { @JoinColumn(name = "category_id", referencedColumnName = "categoryId") }

	)
	// to have unique categorys
	private Set<FoodCategory> foodCategories = new HashSet<>();

	@Lob
	private byte[] image;

//	 helper method
	public List<Ingredients> getAllIngredients() {
		return ingredients_required;
	}

	public void addIngredient(Ingredients ingredients) {
		ingredients_required.add(ingredients);
	}

	public void removeIngredient(Ingredients ingredients) {
		ingredients_required.remove(ingredients);
	}

	public void addSteps(RecipeSteps recipeSteps) {
		steps_required.add(recipeSteps);
	}

	public void removeSteps(RecipeSteps recipeSteps) {
		steps_required.remove(recipeSteps);
	}

	public void addFoodCategory(FoodCategory fc) {
		foodCategories.add(fc);
	}
	public void addFoodCategory(List<FoodCategory> fc) {
		foodCategories.addAll(fc);
	}

	public void removeFoodCategory(FoodCategory fc) {
		foodCategories.remove(fc);
	}
//
//	public void removeFoodCategory(Set<FoodCategoryDTO> fc) {
//		Set<String> namesToRemove = fc.stream().map(FoodCategoryDTO::getName).collect(Collectors.toSet());
//
//		foodCategories.removeIf(category -> namesToRemove.contains(category.getName()));
//	}

	public void removeAllFoodCategory() {
		foodCategories.clear();
	}
}
