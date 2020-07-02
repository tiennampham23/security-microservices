package com.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
	@Query(value = "Select * from tbuser u where u.username = ?1", nativeQuery = true)
	List<UserModel> getUserByUserName(String userName);
}
