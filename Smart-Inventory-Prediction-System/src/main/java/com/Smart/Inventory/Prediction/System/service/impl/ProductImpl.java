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

@Service
public class ProductImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public void create(Long id,ProductRequest productRequest) {

        Category category=categoryRepository.findById(id).orElseThrow(
                ()-> new NotFoundException("Given Category Not Exist")
        );

        Product product=new Product();

        product.setCategories(category);

        product.setName(productRequest.getName());
        product.setPrice(productRequest.getPrice());
        product.setCreatedDate(LocalDateTime.now());
        product.setUpdatedDate(LocalDateTime.now());


        productRepository.save(product);

    }

    @Override
    public ProductResponse getById(Long productId) {

        Product product=productRepository.findById(productId).orElseThrow(
                ()-> new NotFoundException("Given Product not available!!!!!")
        );

        ProductResponse productResponse=new ProductResponse();

        productResponse.setName(product.getName());
        productResponse.setPrice(product.getPrice());


        return productResponse;
    }

    @Override
    public List<ProductResponse> getAll() {

        List<Product> productList=productRepository.findAll();

        List<ProductResponse> productResponseList=new ArrayList<>();

        for(Product product:productList){

            ProductResponse productResponse=new ProductResponse();

            productResponse.setName(product.getName());
            productResponse.setPrice(product.getPrice());


            productResponseList.add(productResponse);
        }


        return productResponseList;
    }

    @Override
    public void updateById(Long productId, ProductRequest productRequest) {

        Product product=productRepository.findById(productId).orElseThrow(
                ()-> new NotFoundException("Given Product not exist for update")
        );

        product.setName(productRequest.getName());
        product.setPrice(productRequest.getPrice());


        productRepository.save(product);

    }

    @Override
    public void delete(Long productId) {

        productRepository.deleteById(productId);

    }
}
