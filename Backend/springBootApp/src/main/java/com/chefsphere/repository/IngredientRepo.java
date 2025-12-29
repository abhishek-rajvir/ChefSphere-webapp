package com.chefsphere.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chefsphere.entities.Ingredients;

public interface IngredientRepo extends JpaRepository<Ingredients, Long>{
	
	@Query("SELECT i FROM Ingredients i WHERE i.recipe =:rid")
	List<Ingredients> findByRecipeid(@Param("rid") Long rid);
	
	List<Ingredients> findByNameInIgnoreCase(List<String> name);
	
}
