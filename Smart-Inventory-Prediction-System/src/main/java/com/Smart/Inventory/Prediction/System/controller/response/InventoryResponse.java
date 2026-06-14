package com.Smart.Inventory.Prediction.System.controller.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InventoryResponse {

    private Long id;
    private Long quantityInStock;
    private Long reOrderLevel;
    private String warehouseLocation;

    private Long productId;
    private String productName;
}
