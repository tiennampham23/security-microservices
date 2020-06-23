package com.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecommerce.model.Product;

public interface ProductService {
	List<Product> getAll();
	Page<Product> getPageable(Pageable pageable);
	Optional<Product> getProductById(int id);
	Product create(Product product);
	Product update(Product product, int id);
}
