package com.ecommerce.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
			user.setPasswordHash(registerUser.getPassword());
			user.setRoleId(2);
			userRepository.save(user);
		} catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public int getUserIdByUserName(String userName) {
		try {
			System.out.println(userName);
			List<UserModel> users = userRepository.getUserByUserName(userName);
			if (users.size() > 0) {
				return users.get(0).getId();
			} else {
				return 0;
			}
			
		} catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<UserModel> getAll() {
		return this.userRepository.findUsers();
	}

}