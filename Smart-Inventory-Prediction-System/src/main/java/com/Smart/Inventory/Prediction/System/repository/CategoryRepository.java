package com.Smart.Inventory.Prediction.System.repository;

import com.Smart.Inventory.Prediction.System.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {


}
