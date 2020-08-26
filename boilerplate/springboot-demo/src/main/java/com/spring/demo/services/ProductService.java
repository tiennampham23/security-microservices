package com.spring.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.demo.dtos.ProductDTO;
import com.spring.demo.models.Product;

public interface ProductService {
	List<Product> getAll();
	Page<Product> getPageable(Pageable pageable, String keywords);
	Optional<Product> getProductById(int id);
	int create(ProductDTO product);
	int update(ProductDTO product, int id);
	List<Product> getProductsByCategoryId(String categoryId);
	List<Product> getProductsBySupplierId(String supplierId);
}
