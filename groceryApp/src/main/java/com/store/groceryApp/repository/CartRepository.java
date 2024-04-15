package com.store.groceryApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.store.groceryApp.entities.CartEntity;
import com.store.groceryApp.entities.ProductEntity;
import com.store.groceryApp.entities.UserEntity;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    CartEntity findByUserAndProduct(UserEntity user, ProductEntity product);
}
