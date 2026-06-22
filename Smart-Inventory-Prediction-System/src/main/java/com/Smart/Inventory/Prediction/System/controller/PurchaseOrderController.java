package com.Smart.Inventory.Prediction.System.controller;


import com.Smart.Inventory.Prediction.System.controller.request.PurchaseOrderRequest;
import com.Smart.Inventory.Prediction.System.controller.response.PurchaseOrderResponse;
import com.Smart.Inventory.Prediction.System.model.Enum.PurchaseOrderStatus;
import com.Smart.Inventory.Prediction.System.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/purchase-orders")
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping
    public ResponseEntity<PurchaseOrderResponse> createOrder(
            @RequestBody PurchaseOrderRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(
                purchaseOrderService.createOrder(request, authentication.getName())
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping
    public ResponseEntity<List<PurchaseOrderResponse>> getAllOrders() {
        return ResponseEntity.ok(purchaseOrderService.getAllOrders());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrderResponse> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(purchaseOrderService.getOrderById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<PurchaseOrderResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam PurchaseOrderStatus status) {
        return ResponseEntity.ok(purchaseOrderService.updateStatus(id, status));
    }
}
