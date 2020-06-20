package com.ecommerce.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class ProductController {
	
	// mock API
	@GetMapping(value = "/products", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody List<Integer> getProducts() {
		// TODO: find all products in database
		return Arrays.asList(1,2);
	}
	
	@RequestMapping("/product/{id}")
	public @ResponseBody Integer getProductById(@PathVariable("id") int id) {
		// TODO: find product by id
		return 1;
	}
	
}
