package com.Smart.Inventory.Prediction.System.service.impl;


import com.Smart.Inventory.Prediction.System.controller.request.InventoryRequest;
import com.Smart.Inventory.Prediction.System.controller.response.InventoryResponse;
import com.Smart.Inventory.Prediction.System.model.Inventory;
import com.Smart.Inventory.Prediction.System.model.Product;
import com.Smart.Inventory.Prediction.System.repository.InventoryRepository;
import com.Smart.Inventory.Prediction.System.repository.ProductRepository;
import com.Smart.Inventory.Prediction.System.service.InventoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class InventoryImpl  implements InventoryService {


    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public InventoryResponse createInventory(InventoryRequest inventoryRequest,Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Inventory inventory = new Inventory();
        inventory.setQuantityInStock(inventoryRequest.getQuantityInStock());
        inventory.setReOrderLevel(inventoryRequest.getReOrderLevel());
        inventory.setWarehouseLocation(inventoryRequest.getWarehouseLocation());
        inventory.setLastRestockedDate(LocalDateTime.now());

        inventory.setProduct(product);

        inventoryRepository.save(inventory);

        return mapToResponse(inventory);
    }

    @Override
    public InventoryResponse getInventoryById(Long id) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        return mapToResponse(inventory);
    }

    @Override
    public List<InventoryResponse> getAllInventories() {

        return inventoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public InventoryResponse updateInventory(Long id, InventoryRequest inventoryRequest) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        inventory.setQuantityInStock(inventoryRequest.getQuantityInStock());
        inventory.setReOrderLevel(inventoryRequest.getReOrderLevel());
        inventory.setWarehouseLocation(inventoryRequest.getWarehouseLocation());
        inventory.setLastRestockedDate(LocalDateTime.now());


        Inventory updated = inventoryRepository.save(inventory);

        return mapToResponse(updated);
    }

    @Override
    public void deleteInventory(Long id) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        inventoryRepository.delete(inventory);
    }

    private InventoryResponse mapToResponse(Inventory inventory) {

        return InventoryResponse.builder()
                .id(inventory.getId())
                .quantityInStock(inventory.getQuantityInStock())
                .reOrderLevel(inventory.getReOrderLevel())
                .warehouseLocation(inventory.getWarehouseLocation())
                .productId(inventory.getProduct().getId())
                .productName(inventory.getProduct().getName())
                .build();
    }
}
