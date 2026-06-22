package com.Smart.Inventory.Prediction.System.controller;


import com.Smart.Inventory.Prediction.System.controller.request.SupplierRequest;
import com.Smart.Inventory.Prediction.System.controller.response.SupplierResponse;
import com.Smart.Inventory.Prediction.System.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public void create(@RequestBody SupplierRequest request) {
        supplierService.create(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/{id}")
    public SupplierResponse getById(@PathVariable Long id) {
        return supplierService.getById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping
    public List<SupplierResponse> getAll() {
        return supplierService.getAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public void updateById(@PathVariable Long id, @RequestBody SupplierRequest request) {
        supplierService.updateById(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        supplierService.delete(id);
    }
}
