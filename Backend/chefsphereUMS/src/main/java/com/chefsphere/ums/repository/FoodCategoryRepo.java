package com.chefsphere.ums.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chefsphere.ums.dto.FoodCategoryDto;
import com.chefsphere.ums.entities.FoodCategory;

public interface FoodCategoryRepo extends JpaRepository<FoodCategory, Long> {

//	@Query("SELECT fc FROM FoodCategory fc WHERE fc.recipe =:rid")
//	List<FoodCategory> findByRecipeid(@Param("rid") Long rid);

	List<FoodCategory> findByNameInIgnoreCase(List<String> name);

	Optional<FoodCategory> findTopByNameIgnoreCaseOrderByCategoryIdAsc(String name);


//	@Query("""
//		    SELECT new com.chefsphere.ums.dto.FoodCategoryDto(
//		        fc.name,
//		        fc.image,
//		        MIN(r.recipeId),
//		        MIN(r.recipeName)
//		    )
//		    FROM FoodCategory fc
//		    JOIN fc.recipe r
//		    GROUP BY fc.name, fc.image
//		    ORDER BY FUNCTION('RAND')
//		""")
//	List<FoodCategoryDto> findAllDistinct();

	@Query("""
		    SELECT new com.chefsphere.ums.dto.FoodCategoryDto(
		        fc.name,
		        fc.image
		    )
		    FROM FoodCategory fc
		    WHERE fc.id = (
		        SELECT MIN(fc2.id)
		        FROM FoodCategory fc2
		        WHERE fc2.name = fc.name
		    )
		""")
	List<FoodCategoryDto> findAllDistinct();
	
	@Query("""
		    SELECT new com.chefsphere.ums.dto.FoodCategoryDto(
		        fc.name,
		        fc.image
		    )
		    FROM FoodCategory fc
		    WHERE fc.id = (
		        SELECT MIN(fc2.id)
		        FROM FoodCategory fc2
		        WHERE fc2.name = fc.name
		    )
		""")
	List<FoodCategoryDto> findAllDistinct(Pageable pageable);

}
