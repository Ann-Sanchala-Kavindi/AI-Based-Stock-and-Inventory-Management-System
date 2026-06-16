package com.Smart.Inventory.Prediction.System.service.impl;

import com.Smart.Inventory.Prediction.System.controller.request.ProductRequest;
import com.Smart.Inventory.Prediction.System.controller.response.ProductResponse;
import com.Smart.Inventory.Prediction.System.exception.NotFoundException;
import com.Smart.Inventory.Prediction.System.model.Category;
import com.Smart.Inventory.Prediction.System.model.Product;
import com.Smart.Inventory.Prediction.System.repository.CategoryRepository;
import com.Smart.Inventory.Prediction.System.repository.ProductRepository;
import com.Smart.Inventory.Prediction.System.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public void create(Long id, ProductRequest productRequest) {
        Category category = categoryRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Given Category Not Exist")
        );
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setBrand(productRequest.getBrand());
        product.setPrice(productRequest.getPrice());
        product.setCategory(category);   // ✅ this was missing
        productRepository.save(product);
    }

    @Override
    public ProductResponse getById(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new NotFoundException("Given Product not available!!!!!")
        );
        return toResponse(product);
    }

    @Override
    public List<ProductResponse> getAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void updateById(Long productId, ProductRequest productRequest) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new NotFoundException("Given Product not exist for update")
        );
        product.setName(productRequest.getName());
        product.setBrand(productRequest.getBrand());
        product.setPrice(productRequest.getPrice());
        productRepository.save(product);
    }

    @Override
    public void delete(Long productId) {
        productRepository.deleteById(productId);
    }

    private ProductResponse toResponse(Product product) {
        ProductResponse res = new ProductResponse();
        res.setId(product.getId());
        res.setName(product.getName());
        res.setBrand(product.getBrand());
        res.setPrice(product.getPrice());
        if (product.getCategory() != null) {
            res.setCategoryId(product.getCategory().getId());
            res.setCategoryName(product.getCategory().getName());
        }
        return res;
    }
}
