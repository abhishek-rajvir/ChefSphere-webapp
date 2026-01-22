package com.chefsphere.ums.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(exclude = {"recipe"})
@NoArgsConstructor
public class FoodCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long categoryId;
	
	@Column(name = "name")
	private String name;
	
	private String image;

    @ManyToMany(mappedBy = "foodCategories", fetch = FetchType.LAZY)
	@JsonBackReference // to bind json to the object
    private Set<Recipe> recipe = new HashSet<>();
	
    // helper method
    public void addRecipe(Recipe rec) {
    	recipe.add(rec);
    }
    
    public void removeRecipe(Recipe rec) {
    	recipe.remove(rec);
    }
}
