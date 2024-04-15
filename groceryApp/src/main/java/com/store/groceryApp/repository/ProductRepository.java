package com.store.groceryApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.store.groceryApp.entities.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    ProductEntity findByName(String productName);

    List<ProductEntity> findByCategory(String category);
}
