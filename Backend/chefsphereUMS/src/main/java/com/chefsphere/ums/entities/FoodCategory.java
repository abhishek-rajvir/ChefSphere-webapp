package com.chefsphere.ums.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

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
