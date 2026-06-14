package com.Smart.Inventory.Prediction.System.service;

import com.Smart.Inventory.Prediction.System.controller.request.CategoryRequest;
import com.Smart.Inventory.Prediction.System.controller.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    void create(CategoryRequest categoryRequest);

    CategoryResponse getById(Long categoryId);

    List<CategoryResponse> getAll();

    void updateById(Long categoryId, CategoryRequest categoryRequest);

    void delete(Long categoryId);
}
