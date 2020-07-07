package com.ecommerce.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Supplier;
import com.ecommerce.repository.SupplierRepository;
import com.ecommerce.service.SupplierService;

@Service
public class SupplierServiceImpl implements SupplierService {
	@Autowired
	private SupplierRepository supplierRepository;

	@Override
	public List<Supplier> getAll() {
		return this.supplierRepository.findAll();
	}

}
