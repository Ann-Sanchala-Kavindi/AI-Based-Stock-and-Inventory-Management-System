package com.Smart.Inventory.Prediction.System.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ManagerRequest {

    private Long id;
    private String username;
    private boolean active;
    private String role;
}
