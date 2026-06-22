package com.Smart.Inventory.Prediction.System.controller.request;


import com.Smart.Inventory.Prediction.System.model.Enum.PurchaseOrderStatus;
import com.Smart.Inventory.Prediction.System.model.Enum.SupplierStatus;
import lombok.Data;

@Data
public class SupplierRequest {

    private String name;
    private String companyName;
    private String email;
    private String phoneNo;
    private String address;
    private SupplierStatus status;
}
