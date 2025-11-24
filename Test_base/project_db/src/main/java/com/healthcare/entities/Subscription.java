package com.healthcare.entities;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

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
@Table(name =  "subscriber")
public class Subscription {
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long subId;
	
	@ManyToOne()
	@JoinColumn(name = "foodie_id",nullable = false)
	private Foodie foodie;

	@ManyToOne()
	@JoinColumn(name = "department_id",nullable = false)
	private Creator creator;

	
	private SubscriptionStatus status = SubscriptionStatus.NOTSUBSCRIBED;

	@DateTimeFormat
	private LocalDateTime startDate;
	
	@DateTimeFormat
	private LocalDateTime endDate;
	
}