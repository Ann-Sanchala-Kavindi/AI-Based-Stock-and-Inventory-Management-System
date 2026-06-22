package com.Smart.Inventory.Prediction.System.controller;


import com.Smart.Inventory.Prediction.System.controller.request.ProductRequest;
import com.Smart.Inventory.Prediction.System.controller.response.ProductResponse;
import com.Smart.Inventory.Prediction.System.model.Product;
import com.Smart.Inventory.Prediction.System.service.ProductService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping(value="/categories/{category-id}/products")
    public void create(@PathVariable ("category-id")Long id,
            @RequestBody ProductRequest productRequest){

        productService.create(id,productRequest);

    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping(value="/products/{id}")
    public ProductResponse getById(@PathVariable ("id") Long productId){

        return productService.getById(productId);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping(value="/products")
    public List<ProductResponse> getAll(){

        return productService.getAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping(value = "/categories/{category-id}/products")
    public List<ProductResponse> getByCategory(@PathVariable("category-id") Long categoryId) {
        return productService.getByCategory(categoryId);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping(value="/products/{id}")
    public void updateById (@PathVariable ("id") Long productId,
                            @RequestBody ProductRequest productRequest){

        productService.updateById(productId,productRequest);


    }


    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @DeleteMapping(value="/products/{id}")
    public void delete(@PathVariable ("id") Long productId){

        productService.delete(productId);
    }


}
