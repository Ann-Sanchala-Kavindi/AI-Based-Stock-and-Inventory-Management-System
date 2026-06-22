package com.Smart.Inventory.Prediction.System.service;

import com.Smart.Inventory.Prediction.System.controller.request.SupplierRequest;
import com.Smart.Inventory.Prediction.System.controller.response.SupplierResponse;

import java.util.List;

public interface SupplierService {

    void create(SupplierRequest request);
    SupplierResponse getById(Long id);
    List<SupplierResponse> getAll();
    void updateById(Long id, SupplierRequest request);
    void delete(Long id);
}
