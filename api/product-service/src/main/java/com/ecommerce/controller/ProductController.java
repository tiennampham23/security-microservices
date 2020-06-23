package com.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecommerce.model.Constants;
import com.ecommerce.model.Product;
import com.ecommerce.model.ResponseDataDTO;
import com.ecommerce.service.ProductService;

@Controller
@RequestMapping("/")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping(value = "/all", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<List<Product>> getProducts() {
		ResponseDataDTO<List<Product>> response = new ResponseDataDTO<>();

		try {
			List<Product> result = productService.getAll();
			response.setData(result);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
			e.printStackTrace();
		}
		return response;
	}

	@GetMapping(value = "/page", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Page<Product>> getPageableProduct(Pageable pageable) {
		ResponseDataDTO<Page<Product>> response = new ResponseDataDTO<>();

		try {
			Page<Product> result = productService.getPageable(pageable);
			response.setData(result);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
			e.printStackTrace();
		}
		return response;
	}
	
	@GetMapping(value = "/getbyid/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Optional<Product>> getLaptopById(@PathVariable("id") int id) {
		ResponseDataDTO<Optional<Product>> response = new ResponseDataDTO<>();
		try {
			response.setData(productService.getProductById(id));
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}
	
	@PostMapping(value = "/create", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE }, consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE})
	public @ResponseBody ResponseDataDTO<Product> create(@RequestBody Product product) {
		ResponseDataDTO<Product> response = new ResponseDataDTO<>();
		try {
			response.setData(productService.create(product));
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}
	
	@PutMapping(value = "/update/{id}", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE }, consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE})
	public @ResponseBody ResponseDataDTO<Product> update(@PathVariable("id") int id, @RequestBody Product product) {
		ResponseDataDTO<Product> response = new ResponseDataDTO<>();
		try {
			response.setData(productService.update(product, id));
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}
}
