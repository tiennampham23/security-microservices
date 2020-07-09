package com.ecommerce.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	@Query(value = "select * from `order` where userid like %:userId% and status like %:status% and createddate <= :toDate and createddate >= :fromDate", 
			countQuery = "select count(*) from order where userid = :userId and status = :status and createddate <= :toDate and createddate >= :fromDate", nativeQuery = true)
	Page<Order> findAllOrdersWithPagination(Pageable pageable, @Param("userId") String userId,
			@Param("status") String status, @Param("fromDate") String fromDate, @Param("toDate") String toDate);
}
