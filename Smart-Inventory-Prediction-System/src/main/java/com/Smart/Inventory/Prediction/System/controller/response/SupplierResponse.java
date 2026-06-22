package com.Smart.Inventory.Prediction.System.controller.response;

import com.Smart.Inventory.Prediction.System.model.Enum.PurchaseOrderStatus;
import com.Smart.Inventory.Prediction.System.model.Enum.SupplierStatus;
import lombok.Data;

@Data
public class SupplierResponse {

    private Long id;
    private String name;
    private String companyName;
    private String email;
    private String phoneNo;
    private String address;
    private SupplierStatus status;
}
