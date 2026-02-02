package com.chefsphere.ums.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "creators")
@ToString(exclude = "foodies")
public class Creator {

	// primary key of creator
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cid;

	/*
	 * no need to define details in child like parent because foodie is parent or
	 * owner mappedby indicates the entity that owns the bidirectional relationship
	 *
	 */
	@ManyToMany(mappedBy = "creators", fetch = FetchType.LAZY)
	@JsonBackReference // to bind json to the object ,helps avoid duplicates

	private Set<Foodie> foodies = new HashSet<>();

	/*
	 * one creator can have many posts But each post will only have one creator
	 */
	@OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true) // if creator is deleted so are
																						// his posts
	// allows to ignore when fetching creator
	@JsonIgnore
	// array helps maintaining order
	private List<Post> posts = new ArrayList<>();

	// User is a Creator
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false, unique = true) // fk is stored here
	private User userId;

//	public void addPost(Post p) {
//		posts.add(p);
////		p.setCreators(this);
//	}

}
