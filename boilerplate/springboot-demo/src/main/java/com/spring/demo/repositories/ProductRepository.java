package com.spring.demo.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.demo.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	@Query(value = "select * from product p where p.categoryid = ?1", nativeQuery = true)
	List<Product> getProductsByCategoryId(String categoryId);
	
	@Query(value = "select * from product p where p.supplierid = ?1", nativeQuery = true)
	List<Product> getProductsBySupplierId(String supplierId);
	
	Page<Product> findAllByProductNameLike(Pageable pageable, String keywords);
}
