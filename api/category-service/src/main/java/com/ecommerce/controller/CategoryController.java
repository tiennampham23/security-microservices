package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecommerce.model.Category;
import com.ecommerce.model.Constants;
import com.ecommerce.model.ResponseDataDTO;
import com.ecommerce.service.CategoryService;

@Controller
@RequestMapping("/")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping(value = "/all", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<List<Category>> getAll() {
		ResponseDataDTO<List<Category>> response = new ResponseDataDTO<>();

		List<Category> categories = null;

		try {
			categories = categoryService.getAll();
			response.setData(categories);
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
