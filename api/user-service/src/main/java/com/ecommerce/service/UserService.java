package com.ecommerce.service;

import java.util.List;

import com.ecommerce.dto.RegisterUserDTO;
import com.ecommerce.model.UserModel;

public interface UserService {
	int register(RegisterUserDTO user);
	int getUserIdByUserName(String userName);
	List<UserModel> getAll();
}
