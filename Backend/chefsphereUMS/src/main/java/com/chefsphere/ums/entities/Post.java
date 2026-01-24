package com.chefsphere.ums.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "posts")
@ToString(exclude = {"recipe","creator"})
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pid;
	
	private String postTitle;
	
	private String description;
	
	private String textContent ;
	
	private String videoUrl;
	private String videoTag;
	
	// One post has one recipe
	@OneToOne(cascade = CascadeType.ALL) // if user is deleted so is creator
	@JoinColumn(name = "recipe_id") // fk is stored here
	private Recipe recipe;	
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn( name = "creator_id") // fk is stored here	
	private Creator creator;

	/*
	 * one post can have many comments But each comment will only have one post
	 */
	// mapped by Comment.post [holds the key]
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Comment> comments = new ArrayList<>();

	// avg of all ratings
	private Double avgRating = 0.0;
	
	// no of foodies have rated the post
	private Long ratingCount = 0l;
	
	
	public void addRating(int newRating) {
	    avgRating =
	        ((avgRating * ratingCount) + newRating) / (ratingCount + 1);
	    ratingCount++;
	}

	public void removeRating() {
		avgRating = 0.0;
		ratingCount = 0L;
	}
	
	public void addComment(Comment comment) {
		comments.add(comment);
	}

	public void removeComment(Comment comment) {
		comments.remove(comment);
	}
	
	// helper method
	public void addRecipe(Recipe rec) {
		recipe = rec;
	}
	
	public void removeRecipee(Recipe rec) {
		recipe = null;
	}
	
}
