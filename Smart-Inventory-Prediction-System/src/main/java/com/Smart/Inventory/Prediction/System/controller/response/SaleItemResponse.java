package com.Smart.Inventory.Prediction.System.controller.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Builder
@Data
public class SaleItemResponse {

    private Long productId;

    private String productName;

    private Long quantity;

    private BigDecimal unitPrice;

    private BigDecimal subTotal;





}
