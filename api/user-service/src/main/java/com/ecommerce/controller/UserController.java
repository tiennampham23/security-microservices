package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@PostMapping(value = "/register", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = {
			MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Integer> register(@RequestBody RegisterUserDTO user) {
		ResponseDataDTO<Integer> response = new ResponseDataDTO<>();

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
