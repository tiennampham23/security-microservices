package com.ecommerce.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.ChangeStatusDTO;
import com.ecommerce.dto.OrderDTO;
import com.ecommerce.dto.OrderProductDTO;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderDetail;
import com.ecommerce.model.Status;
import com.ecommerce.repository.OrderDetailRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.service.OrderService;
import com.ecommerce.util.DateTimeExtension;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	@Override
	public int create(OrderDTO order, int currentUser) {
		try {
			float totalPrices = 0;
			for (OrderProductDTO orderProduct : order.getListProducts()) {
				totalPrices += orderProduct.getTotalPrice();
			}
			Order newOrder = new Order(currentUser, totalPrices, DateTimeExtension.getCurrentDate(), order.getAddress(), order.getPhone(), Status.WAITING.getMessage());
			Order savedOrder =orderRepository.save(newOrder);
		
			for (OrderProductDTO orderProduct : order.getListProducts()) {
				OrderDetail orderDetail = new OrderDetail(savedOrder.getId(), orderProduct.getProductId(), orderProduct.getTotalPrice(), orderProduct.getAmount());
				orderDetailRepository.save(orderDetail);
			}
			return 1;
		} catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public int changeStatus(ChangeStatusDTO changeStatusDTO) {
		try {
			for (Integer orderId : changeStatusDTO.getListOrderId()) {
				Order order = orderRepository.getOne(orderId);
				order.setStatus(changeStatusDTO.getStatus());
				orderRepository.save(order);
			}
			// TODO Auto-generated method stub
			return 1;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<Order> getAll() {
		try {
			return orderRepository.findAll();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Page<Order> getPageable(Pageable pageable, String userId, String status, String fromDate, String toDate) {
		try {
			if (status == null) {
				status = "";
			}
			if (userId == null) {
				userId = "";
			}
			String plusFromDate = LocalDate.parse(fromDate).plusDays(-1).toString();
			String plusToDate = LocalDate.parse(toDate).plusDays(1).toString();
			
			System.out.println(plusFromDate);
			System.out.println(plusToDate);
			return orderRepository.findAllOrdersWithPagination(pageable, userId, status, plusFromDate, plusToDate);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Optional<Order> getOrderById(int id) {
		return this.orderRepository.findById(id);
	}

	@Override
	public List<OrderDetail> getOrderDetails(int id) {
		return this.orderDetailRepository.getOrderDetails(id);
	}

	@Override
	public int getTotalItemsByStatus(String orderStatus) {
		return this.orderRepository.getTotalOrdersByStatus(orderStatus);
	}

}
