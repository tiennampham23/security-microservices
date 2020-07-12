package com.ecommerce.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Constants;
import com.ecommerce.model.ResponseDataDTO;

@RestController
@RequestMapping("/")
public class AuthenticationController {
	@GetMapping(value = "/get-current-user")
	public String getCurrentUser() {
		ResponseDataDTO<String> response = new ResponseDataDTO<>();
		Object principal = SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		String username = null;

		if (principal instanceof UserDetails) {
			username = ((UserDetails) principal).getUsername();
		} else {
			username = principal.toString();
		}
		response.setData(username);
		response.setCode(Constants.SUCCESS_CODE);
		response.setMessage(Constants.SUCCESS_MSG);
		return username;
	}
	
	@GetMapping(value = "/whoiam")
	public ResponseDataDTO<String> whoIAm() {
		ResponseDataDTO<String> response = new ResponseDataDTO<>();
		Object principal = SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		String username = null;

		if (principal instanceof UserDetails) {
			username = ((UserDetails) principal).getUsername();
		} else {
			username = principal.toString();
		}
		response.setData(username);
		response.setCode(Constants.SUCCESS_CODE);
		response.setMessage(Constants.SUCCESS_MSG);
		return response;
	}
}
