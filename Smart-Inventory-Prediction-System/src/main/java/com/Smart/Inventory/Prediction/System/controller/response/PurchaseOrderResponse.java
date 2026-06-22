package com.Smart.Inventory.Prediction.System.controller.response;

import com.Smart.Inventory.Prediction.System.model.Enum.PurchaseOrderStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PurchaseOrderResponse {

    private Long id;
    private Long productId;
    private String productName;
    private Long supplierId;
    private String supplierName;
    private Long quantityOrdered;
    private PurchaseOrderStatus status;
    private String orderedByUsername;
    private LocalDateTime orderDate;
    private LocalDateTime receivedDate;
}
