package com.healthcare.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
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
@Table(name =  "creators")
@ToString(exclude = {"foodies","posts"})
public class Creator{
	
	
	// primary key of creator
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long c_id;
	
	/*
	 *	no need to define details in child like parent 
	 *	because foodie is parent or owner 
	 *  mappedby indicates the entity that owns the bidirectional relationship
	 *
	*/
	@ManyToMany(mappedBy = "creators", fetch = FetchType.LAZY)
	@JsonManagedReference
	@JsonBackReference // to bind json to the object
	private Set<Foodie> foodies = new HashSet<>();;
	
	/*
	 *  one creator can have many posts
	 *  But each post will only have one creator
	 */

	@OneToMany(mappedBy = "creators", cascade = CascadeType.ALL, orphanRemoval = true) // if creator is deleted so are his posts
	@JsonManagedReference
	@JsonBackReference
    private List<Post> posts = new ArrayList<>();
	
	
	// User is a Creator
	@OneToOne(cascade = CascadeType.ALL) // if user is deleted so is creator
	@JoinColumn(name = "user_id", nullable = false,unique = true) // fk is stored here
	private User userId;
	
    // helper method
	
	// followers
	
	public void addFollower(Foodie f) {
		foodies.add(f);
	}
	
	// posts
    public void addPost(Post post) {
        posts.add(post);
        post.setCreators(this);
    }
    
    public void removePost(Post post) {
    	posts.remove(post);
    	post.setCreators(null);
    }
    
    public List<Post> getAllPost() {
    	return posts;
    }
}
