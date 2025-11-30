package com.healthcare.entities;


import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
// avoid using @data causes data binding issues use get set instead
@Getter
@Setter
@NoArgsConstructor
@Table(name =  "foodies")
@ToString(exclude = {"creators"})
public class Foodie {
	
	// primary key of foodie
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fid;
	
	@ManyToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL )
	// create additonal table with the given columns at runtime
	@JoinTable(name = "foodie_creator_relation", // name of the table
			joinColumns = {
					
					/*
					 * column name and what it column data it should refer/point
					 * it in the column
					 */
					@JoinColumn(name = "foodie_id" , referencedColumnName = "fid")
			},
			
			inverseJoinColumns = {
					@JoinColumn(name = "creator_id" , referencedColumnName = "cid")					
			}
			
	)
	
	
	// using set keeps data unique avoid recreation of table each time
	@JsonManagedReference // avoid conflicts of jackson during get reuest (eg: list ALL)
	private Set<Creator> creators = new HashSet<>();

	// User is Foodie
	@OneToOne(cascade = CascadeType.ALL) // if user is deleted so is creator
	@JoinColumn( name = "user_id", nullable = false,unique = true) // fk is stored here
	private User userId;
	
}
