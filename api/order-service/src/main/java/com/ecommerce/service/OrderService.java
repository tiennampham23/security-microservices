package com.ecommerce.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecommerce.dto.ChangeStatusDTO;
import com.ecommerce.dto.OrderDTO;
import com.ecommerce.model.Order;

public interface OrderService {
	int create(OrderDTO order, int currentUser);
	
	int changeStatus(ChangeStatusDTO changeStatusDTO);
	
	List<Order> getAll();
	
	Page<Order> getPageable(Pageable pageable);
}
