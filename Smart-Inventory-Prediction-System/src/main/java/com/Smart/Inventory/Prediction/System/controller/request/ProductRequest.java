package com.Smart.Inventory.Prediction.System.controller.request;

import lombok.Data;
import tools.jackson.databind.annotation.JsonNaming;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@JsonNaming
@Data
public class ProductRequest {


    private String name;
    private BigDecimal price;

}
