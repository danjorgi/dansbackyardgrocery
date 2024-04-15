package com.store.groceryApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.store.groceryApp.entities.CartEntity;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    
}
