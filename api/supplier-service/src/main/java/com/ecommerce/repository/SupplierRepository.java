package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

}
