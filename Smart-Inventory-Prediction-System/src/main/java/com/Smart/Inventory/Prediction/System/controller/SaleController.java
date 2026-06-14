package com.Smart.Inventory.Prediction.System.controller;

import com.Smart.Inventory.Prediction.System.controller.request.SaleRequest;
import com.Smart.Inventory.Prediction.System.controller.response.SaleResponse;
import com.Smart.Inventory.Prediction.System.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api/sales")
public class SaleController {

    private final SaleService saleService;

    @PostMapping
    public ResponseEntity<SaleResponse> createSale(
            @RequestBody SaleRequest request) {

        return ResponseEntity.ok(
                saleService.createSale(request)
        );
    }

    @GetMapping("/{saleId}")
    public ResponseEntity<SaleResponse> getSaleById(
            @PathVariable Long saleId) {

        return ResponseEntity.ok(
                saleService.getSaleById(saleId)
        );
    }

    @GetMapping
    public ResponseEntity<List<SaleResponse>> getAllSales() {

        return ResponseEntity.ok(
                saleService.getAllSales()
        );
    }

    @DeleteMapping("/{saleId}")
    public ResponseEntity<String> deleteSale(
            @PathVariable Long saleId) {

        saleService.deleteSale(saleId);

        return ResponseEntity.ok("Sale deleted successfully");
    }




}
