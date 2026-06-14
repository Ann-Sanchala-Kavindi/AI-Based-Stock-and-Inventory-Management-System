package com.Smart.Inventory.Prediction.System.service;

import com.Smart.Inventory.Prediction.System.controller.request.InventoryRequest;
import com.Smart.Inventory.Prediction.System.controller.response.InventoryResponse;

import java.util.List;

public interface InventoryService {

    InventoryResponse createInventory(InventoryRequest inventoryRequest,Long id);

    InventoryResponse getInventoryById(Long id);

    List<InventoryResponse> getAllInventories();

    InventoryResponse updateInventory(Long id, InventoryRequest inventoryRequest);

    void deleteInventory(Long id);
}
