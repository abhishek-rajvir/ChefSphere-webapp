package com.chefsphere.ums.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor		
@Table(name = "ratings")
public class Rating {

	// primary key of comment
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ratingId;
	
	private String foodieName;
	
	private Integer rating;
	
	@OneToOne(cascade = CascadeType.ALL) // if post is deleted so is rating
	@JoinColumn( name = "post_id") // fk is stored here
	private Post post;
	
}
