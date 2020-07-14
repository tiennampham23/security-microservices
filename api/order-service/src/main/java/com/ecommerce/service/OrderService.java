package com.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecommerce.dto.ChangeStatusDTO;
import com.ecommerce.dto.OrderDTO;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderDetail;

public interface OrderService {
	int create(OrderDTO order, int currentUser);
	
	int changeStatus(ChangeStatusDTO changeStatusDTO);
	
	List<Order> getAll();
	
	Page<Order> getPageable(Pageable pageable, String userId, String status, String fromDate, String toDate);

	Optional<Order> getOrderById(int id);

	List<OrderDetail> getOrderDetails(int id);

	int getTotalItemsByStatus(String orderStatus);
}
