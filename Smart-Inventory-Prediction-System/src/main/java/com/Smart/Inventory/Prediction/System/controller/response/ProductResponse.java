package com.Smart.Inventory.Prediction.System.controller.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductResponse {

    private Long id;
    private String name;
    private String brand;
    private BigDecimal price;
    private Long categoryId;
    private String categoryName;


}
