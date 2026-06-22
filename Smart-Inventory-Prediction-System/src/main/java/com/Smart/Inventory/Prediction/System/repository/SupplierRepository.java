package com.Smart.Inventory.Prediction.System.repository;

import com.Smart.Inventory.Prediction.System.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {


    List<Supplier> findByStatus(com.Smart.Inventory.Prediction.System.model.Enum.SupplierStatus status);
}
