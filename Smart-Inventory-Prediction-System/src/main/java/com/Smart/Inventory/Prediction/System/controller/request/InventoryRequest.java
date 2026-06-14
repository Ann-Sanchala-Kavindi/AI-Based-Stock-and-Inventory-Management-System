package com.Smart.Inventory.Prediction.System.controller.request;

import lombok.Data;
import tools.jackson.databind.annotation.JsonNaming;

import java.time.LocalDateTime;

@JsonNaming
@Data
public class InventoryRequest {

    private Long quantityInStock;
    private LocalDateTime lastRestockedDate;
    private Long reOrderLevel;
    private String warehouseLocation;


}
