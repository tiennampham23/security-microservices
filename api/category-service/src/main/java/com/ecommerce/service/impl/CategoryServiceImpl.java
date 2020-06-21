package com.ecommerce.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Category;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public List<Category> getAll() {
		// TODO find all categories
		List<Category> categories = null;
		try {
			categories = categoryRepository.findAll();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return categories;
	}

}
