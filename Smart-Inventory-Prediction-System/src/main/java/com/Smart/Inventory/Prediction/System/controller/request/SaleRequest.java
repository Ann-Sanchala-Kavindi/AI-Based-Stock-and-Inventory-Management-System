package com.Smart.Inventory.Prediction.System.controller.request;


import com.Smart.Inventory.Prediction.System.model.Enum.PaymentMethod;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class SaleRequest {


    private PaymentMethod paymentMethod;

    private Long managerId;

    private List<SaleItemRequest> saleItems;
}
