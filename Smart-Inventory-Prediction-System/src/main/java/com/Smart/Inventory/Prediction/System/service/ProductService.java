package com.Smart.Inventory.Prediction.System.service;

import com.Smart.Inventory.Prediction.System.controller.request.ProductRequest;
import com.Smart.Inventory.Prediction.System.controller.response.ProductResponse;
import com.Smart.Inventory.Prediction.System.model.Product;

import java.util.List;

public interface ProductService {
    void create(Long id,ProductRequest productRequest);

    ProductResponse getById(Long productId);

    List<ProductResponse> getAll();

    void updateById(Long productId, ProductRequest productRequest);

    void delete(Long productId);
}
