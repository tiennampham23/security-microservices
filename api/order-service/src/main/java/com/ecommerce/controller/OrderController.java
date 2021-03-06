package com.ecommerce.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.ecommerce.dto.ChangeStatusDTO;
import com.ecommerce.dto.OrderDTO;
import com.ecommerce.model.Constants;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderDetail;
import com.ecommerce.model.ResponseDataDTO;
import com.ecommerce.service.OrderService;

@Controller
@RequestMapping("/")
public class OrderController {
	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private Environment env;

	@Autowired
	private OrderService orderService;

	@RequestMapping("/admin")
	public String homeAdmin() {
		return "This is the admin area of Gallery service running at port: " + env.getProperty("local.server.port");
	}

	@GetMapping(value = "/all", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<List<Order>> getOrders() {
		ResponseDataDTO<List<Order>> response = new ResponseDataDTO<>();
		try {
			List<Order> result = orderService.getAll();
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
	
	@GetMapping(value = "/total-orders-by-status", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Integer> getTotalOrdersByStatus(String orderStatus) {
		ResponseDataDTO<Integer> response = new ResponseDataDTO<>();
		try {
			int result = orderService.getTotalItemsByStatus(orderStatus);
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

	@GetMapping(value = "/page", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Page<Order>> getPageableProduct(Pageable pageable, String userId,
			String status, String fromDate, String toDate) {
		ResponseDataDTO<Page<Order>> response = new ResponseDataDTO<>();

		try {
			Page<Order> result = orderService.getPageable(pageable, userId, status, fromDate, toDate);
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

	@GetMapping(value = "/get-my-orders", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Page<Order>> getMyOrders(Pageable pageable, String status, String fromDate,
			String toDate, @RequestHeader Map<String, String> headers) {
		HttpHeaders rqHeaders = new HttpHeaders();
		rqHeaders.setContentType(MediaType.APPLICATION_JSON);
		rqHeaders.set("Authorization", headers.get("authorization"));
		HttpEntity<Object> entity = new HttpEntity<Object>("parameters", rqHeaders);
		ResponseEntity<String> userName = restTemplate.exchange("http://zuul-server/get-current-user", HttpMethod.GET,
				entity, String.class);

		ResponseEntity<Integer> userId = restTemplate.exchange(
				"http://user-service/get-user-by-user-name?userName={userName}", HttpMethod.GET, entity, Integer.class,
				userName.getBody());
		
		ResponseDataDTO<Page<Order>> response = new ResponseDataDTO<>();

		try {
			Page<Order> result = orderService.getPageable(pageable, userId.getBody().toString(), status, fromDate, toDate);
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

	@GetMapping(value = "/getbyid/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Optional<Order>> getOrderById(@PathVariable("id") int id) {
		ResponseDataDTO<Optional<Order>> response = new ResponseDataDTO<>();
		try {
			response.setData(orderService.getOrderById(id));
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}

	@GetMapping(value = "/get-detail-by-id/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<List<OrderDetail>> getOrderDetailById(@PathVariable("id") int id) {
		ResponseDataDTO<List<OrderDetail>> response = new ResponseDataDTO<>();
		try {
			response.setData(orderService.getOrderDetails(id));
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}

	@PostMapping(value = "/create", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = {
			MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Integer> createOrder(@RequestBody OrderDTO order,
			@RequestHeader Map<String, String> headers) {
		ResponseDataDTO<Integer> response = new ResponseDataDTO<>();
		HttpHeaders rqHeaders = new HttpHeaders();
		rqHeaders.setContentType(MediaType.APPLICATION_JSON);
		rqHeaders.set("Authorization", headers.get("authorization"));
		HttpEntity<Object> entity = new HttpEntity<Object>("parameters", rqHeaders);
		ResponseEntity<String> userName = restTemplate.exchange("http://zuul-server/get-current-user", HttpMethod.GET,
				entity, String.class);

		ResponseEntity<Integer> userId = restTemplate.exchange(
				"http://user-service/get-user-by-user-name?userName={userName}", HttpMethod.GET, entity, Integer.class,
				userName.getBody());

		try {
			response.setData(orderService.create(order, userId.getBody()));
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}

	@PostMapping(value = "/change-status", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = {
			MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<Integer> changeStatus(@RequestBody ChangeStatusDTO changeStatusDTO) {
		ResponseDataDTO<Integer> response = new ResponseDataDTO<>();
		try {
			response.setData(orderService.changeStatus(changeStatusDTO));
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}
}
