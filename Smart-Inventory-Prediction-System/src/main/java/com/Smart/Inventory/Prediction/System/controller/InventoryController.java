package com.Smart.Inventory.Prediction.System.controller;

import com.Smart.Inventory.Prediction.System.controller.request.InventoryRequest;
import com.Smart.Inventory.Prediction.System.controller.response.InventoryResponse;
import com.Smart.Inventory.Prediction.System.service.InventoryService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api/inventories")
public class InventoryController {

    private final InventoryService inventoryService;

    @RolesAllowed({"ADMIN" , "MANAGER"})
    @PostMapping("/products/{productId}")
    public ResponseEntity<InventoryResponse> createInventory(
            @PathVariable ("productId") Long id,
            @RequestBody InventoryRequest inventoryRequest) {

        return ResponseEntity.ok(
                inventoryService.createInventory(inventoryRequest,id)
        );
    }

    @RolesAllowed({"ADMIN" , "MANAGER"})
    @GetMapping("/{id}")
    public ResponseEntity<InventoryResponse> getInventoryById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                inventoryService.getInventoryById(id)
        );
    }

    @RolesAllowed({"ADMIN" , "MANAGER"})
    @GetMapping
    public ResponseEntity<List<InventoryResponse>> getAllInventories() {

        return ResponseEntity.ok(
                inventoryService.getAllInventories()
        );
    }

    @RolesAllowed({"ADMIN" , "MANAGER"})
    @PutMapping("/{id}")
    public ResponseEntity<InventoryResponse> updateInventory(
            @PathVariable Long id,
            @RequestBody InventoryRequest inventoryRequest) {

        return ResponseEntity.ok(
                inventoryService.updateInventory(id, inventoryRequest)
        );
    }

    @RolesAllowed({"ADMIN" , "MANAGER"})
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInventory(
            @PathVariable Long id) {

        inventoryService.deleteInventory(id);

        return ResponseEntity.ok("Inventory deleted successfully");
    }
}
