package com.ecommerce.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecommerce.dto.RegisterUserDTO;
import com.ecommerce.model.Constants;
import com.ecommerce.model.ResponseDataDTO;
import com.ecommerce.service.UserService;

@Controller
@RequestMapping("/")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping(value = "/register", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE }, consumes = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseDataDTO<Integer> register(@RequestBody RegisterUserDTO user) {
		ResponseDataDTO<Integer> response = new ResponseDataDTO<>();
		
		try {
			int result = userService.register(user);
			response.setData(result);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch(Exception e) {
			response.setData(0);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
			e.printStackTrace();
		}
		return response;
	}
	
	@PostMapping(value = "/register-1", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE }, consumes = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody List<Integer> register1(@RequestBody RegisterUserDTO user) {
		return Arrays.asList(1, 2);
	}
	
	@GetMapping(value = "/", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody List<Integer> getProducts() {
		// TODO: find all products in database
		return Arrays.asList(1, 2);
	}
}
