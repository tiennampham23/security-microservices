package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecommerce.model.Constants;
import com.ecommerce.model.ResponseDataDTO;
import com.ecommerce.model.Supplier;
import com.ecommerce.service.SupplierService;

@Controller
@RequestMapping("/")
public class SupplierController {

	@Autowired
	private SupplierService supplierService;
	
	@GetMapping(value = "/all", produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseDataDTO<List<Supplier>> getAll() {
		ResponseDataDTO<List<Supplier>> response = new ResponseDataDTO<>();

		List<Supplier> suppliers = null;

		try {
			suppliers = supplierService.getAll();
			response.setData(suppliers);
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
