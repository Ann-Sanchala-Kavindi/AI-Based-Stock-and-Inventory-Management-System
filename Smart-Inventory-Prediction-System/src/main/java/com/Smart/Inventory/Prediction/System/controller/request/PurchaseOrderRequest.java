package com.Smart.Inventory.Prediction.System.controller.request;

import lombok.Data;

@Data
public class PurchaseOrderRequest {

    private Long productId;
    private Long supplierId;
    private Long quantityOrdered;
}
