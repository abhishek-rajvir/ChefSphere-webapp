package com.healthcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.RecipeSteps;

public interface RecipeStepsRepo extends JpaRepository<RecipeSteps, Long>{

}
