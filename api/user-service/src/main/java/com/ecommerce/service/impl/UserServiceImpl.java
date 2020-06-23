package com.ecommerce.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.RegisterUserDTO;
import com.ecommerce.model.UserModel;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.UserService;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	
	@Override
	public int register(RegisterUserDTO registerUser) {
		try {
			// TODO Auto-generated method stub
			UserModel user = new UserModel();
			user.setUsername(registerUser.getUserName());
			user.setAddress(registerUser.getAddress());
			user.setFullName(registerUser.getFullName());
			user.setPhone(registerUser.getPhone());
			user.setPasswordHash(new BCryptPasswordEncoder().encode(registerUser.getPassword()));
			user.setRoleId(2);
			userRepository.save(user);
		} catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

}