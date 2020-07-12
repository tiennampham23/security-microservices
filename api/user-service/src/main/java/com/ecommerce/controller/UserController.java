package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.ecommerce.dto.RegisterUserDTO;
import com.ecommerce.model.Constants;
import com.ecommerce.model.ResponseDataDTO;
import com.ecommerce.model.UserModel;
import com.ecommerce.service.UserService;

@Controller
@RequestMapping("/")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private RestTemplate restTemplate;

	@PostMapping(value = "/register", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = {
			MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Integer> register(@RequestBody RegisterUserDTO user) {
		ResponseDataDTO<Integer> response = new ResponseDataDTO<>();
		ResponseEntity<String> passwordHash = restTemplate.exchange(
				"http://zuul-server/hash-password?password={password}", HttpMethod.GET, null, String.class,
				user.getPassword());
		
		user.setPassword(passwordHash.getBody());

		try {
			int result = userService.register(user);
			response.setData(result);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			response.setData(0);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
			e.printStackTrace();
		}
		return response;
	}
	
	@GetMapping(value = "/all", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<List<UserModel>> getUsers() {
		ResponseDataDTO<List<UserModel>> response = new ResponseDataDTO<>();
		try {
			List<UserModel> result = userService.getAll();
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

	@GetMapping(value = "/get-user-by-user-name", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody Integer getUserIdByUserName(String userName) {
		try {
			int result = userService.getUserIdByUserName(userName);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
}
