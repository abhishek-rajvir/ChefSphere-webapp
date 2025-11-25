package com.healthcare.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@ToString
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long post_id;
	
	private String post_title;
	
	private String description;
	
	@Enumerated(EnumType.STRING)
	private PostType postType;
	
	private String videoTag;
	
	@ManyToOne( fetch = FetchType.LAZY)
	@JoinColumn( name = "creator_id", nullable = false) // fk is stored here
	private Creator creators;
	
	/*
	 * One post has one recipe
	 */
	@OneToOne(mappedBy = "posts", cascade = CascadeType.ALL) // if user is deleted so is creator
	private Recipe recipe;
	
	/*
	 * One post has many comments
	 */
	@OneToMany(mappedBy = "posts",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Comment> comments;
}
