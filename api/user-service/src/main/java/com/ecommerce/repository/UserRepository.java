package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {

}
