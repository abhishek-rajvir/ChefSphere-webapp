package com.chefsphere.ums.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "comments")
public class Comment {

	// primary key of comment
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentId;
	
	private String foodieName;
	
	private String message;
	
	@ManyToOne(fetch = FetchType.LAZY) // Lazy loading is often preferred for performance
    @JoinColumn(name = "post_id") // Foreign key column
	private Post post;
	
}
