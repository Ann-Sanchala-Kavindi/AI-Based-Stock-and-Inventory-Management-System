package com.Smart.Inventory.Prediction.System.repository;

import com.Smart.Inventory.Prediction.System.model.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder,Long> {

    List<PurchaseOrder> findByProductId(Long productId);
    List<PurchaseOrder> findBySupplierId(Long supplierId);
}


