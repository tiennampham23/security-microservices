package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("/")
public class OrderController {
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private Environment env;

	// mock API
	@GetMapping(value = "/get-products", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody List<Integer> getProducts() {
		List<Integer> list = restTemplate.getForObject("http://product-service/products/", List.class);
		return list;
	}

	@RequestMapping("/admin")
	public String homeAdmin() {
		return "This is the admin area of Gallery service running at port: " + env.getProperty("local.server.port");
	}
}
