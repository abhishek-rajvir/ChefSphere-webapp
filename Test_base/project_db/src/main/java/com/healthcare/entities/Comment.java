package com.healthcare.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name =  "comments")
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long comment_id;
	
	@Column(columnDefinition="TEXT")
	private String comment_text;
	

	@ManyToOne
	@JoinColumn(name = "foodie_id", nullable = false)
	private Foodie foodie;
	
	@ManyToOne
	@JoinColumn(name = "postId",nullable = false)
	private Post post;
	
	
	
}
