package com.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.OrderDetail;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
	@Query(value = "select * from `orderDetail` where orderid = :orderId ", nativeQuery = true)
	List<OrderDetail> getOrderDetails(@Param("orderId") int id);
}
