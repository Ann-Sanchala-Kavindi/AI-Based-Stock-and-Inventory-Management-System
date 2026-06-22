package com.Smart.Inventory.Prediction.System.service;

import com.Smart.Inventory.Prediction.System.controller.request.PurchaseOrderRequest;
import com.Smart.Inventory.Prediction.System.controller.response.PurchaseOrderResponse;
import com.Smart.Inventory.Prediction.System.model.Enum.PurchaseOrderStatus;

import java.util.List;

public interface  PurchaseOrderService {

    PurchaseOrderResponse createOrder(PurchaseOrderRequest request, String username);
    List<PurchaseOrderResponse> getAllOrders();
    PurchaseOrderResponse getOrderById(Long orderId);
    PurchaseOrderResponse updateStatus(Long orderId, PurchaseOrderStatus newStatus);
}
