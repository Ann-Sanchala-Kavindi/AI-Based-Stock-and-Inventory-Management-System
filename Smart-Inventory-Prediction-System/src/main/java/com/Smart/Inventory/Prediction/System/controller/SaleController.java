package com.Smart.Inventory.Prediction.System.controller;

import com.Smart.Inventory.Prediction.System.controller.request.SaleRequest;
import com.Smart.Inventory.Prediction.System.controller.response.SaleResponse;
import com.Smart.Inventory.Prediction.System.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/sales")
public class SaleController {

    private final SaleService saleService;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping
    public ResponseEntity<SaleResponse> createSale(
            @RequestBody SaleRequest request,
            Authentication authentication) {
        String username = authentication.getName();   // ✅ logged-in user's username from JWT
        return ResponseEntity.ok(
                saleService.createSale(request, username)
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/{saleId}")
    public ResponseEntity<SaleResponse> getSaleById(@PathVariable Long saleId) {
        return ResponseEntity.ok(saleService.getSaleById(saleId));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping
    public ResponseEntity<List<SaleResponse>> getAllSales() {
        return ResponseEntity.ok(saleService.getAllSales());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{saleId}")
    public ResponseEntity<String> deleteSale(@PathVariable Long saleId) {
        saleService.deleteSale(saleId);
        return ResponseEntity.ok("Sale deleted successfully");
    }
}
