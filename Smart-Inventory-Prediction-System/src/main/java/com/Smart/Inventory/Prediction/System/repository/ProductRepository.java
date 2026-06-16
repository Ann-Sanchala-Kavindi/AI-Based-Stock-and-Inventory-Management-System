package com.Smart.Inventory.Prediction.System.repository;

import com.Smart.Inventory.Prediction.System.model.Category;
import com.Smart.Inventory.Prediction.System.model.Inventory;
import com.Smart.Inventory.Prediction.System.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {


    Optional<Product> findByCategoryId(Long categoryId);
}
