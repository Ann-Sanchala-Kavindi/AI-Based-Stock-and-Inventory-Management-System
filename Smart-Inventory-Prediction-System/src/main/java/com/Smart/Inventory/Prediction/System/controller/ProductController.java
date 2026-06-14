package com.Smart.Inventory.Prediction.System.controller;


import com.Smart.Inventory.Prediction.System.controller.request.ProductRequest;
import com.Smart.Inventory.Prediction.System.controller.response.ProductResponse;
import com.Smart.Inventory.Prediction.System.model.Product;
import com.Smart.Inventory.Prediction.System.service.ProductService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @RolesAllowed({"ADMIN" , "MANAGER"})
    @PostMapping(value="/categories/{category-id}/products")
    public void create(@PathVariable ("category-id")Long id,
            @RequestBody ProductRequest productRequest){

        productService.create(id,productRequest);

    }

    @RolesAllowed({"ADMIN" , "MANAGER"})
    @GetMapping(value="/products/{id}")
    public ProductResponse getById(@PathVariable ("id") Long productId){

        return productService.getById(productId);
    }

    @RolesAllowed({"ADMIN" , "MANAGER"})
    @GetMapping(value="/products")
    public List<ProductResponse> getAll(){

        return productService.getAll();
    }

    @RolesAllowed({"ADMIN" , "MANAGER"})
    @PutMapping(value="/products/{id}")
    public void updateById (@PathVariable ("id") Long productId,
                            @RequestBody ProductRequest productRequest){

        productService.updateById(productId,productRequest);


    }


    @RolesAllowed({"ADMIN" , "MANAGER"})
    @DeleteMapping(value="/products/{id}")
    public void delete(@PathVariable ("id") Long productId){

        productService.delete(productId);
    }
    

}
