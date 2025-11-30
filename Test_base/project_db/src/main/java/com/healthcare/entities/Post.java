package com.healthcare.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "posts")
@ToString(exclude = {"recipe","creator"})
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pid;
	
	private String post_title;
	
	private String description;
	
	private String textContent ;
	
	private String videoTag;
	
	// One post has one recipe
	@OneToOne(cascade = CascadeType.ALL) // if user is deleted so is creator
	@JoinColumn(name = "recipe_id") // fk is stored here
	private Recipe recipe;	
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn( name = "creator_id") // fk is stored here	
	private Creator creator;

	// helper method
	public void addRecipe(Recipe rec) {
		recipe = rec;
	}
	
	public void removeRecipee(Recipe rec) {
		recipe = null;
	}
	
}
