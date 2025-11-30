package com.healthcare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.FoodCategory;


public interface FoodCategoryRepo extends JpaRepository<FoodCategory, Long>{
	Optional<FoodCategory> findByName(String name);
}
