package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
	@Query(value = "select * from tbuser u where u.username = :username and u.passwordhash = :passwordHash ", nativeQuery = true)
	UserModel login(@Param("username") String username, @Param("passwordHash") String passwordHash);
}
