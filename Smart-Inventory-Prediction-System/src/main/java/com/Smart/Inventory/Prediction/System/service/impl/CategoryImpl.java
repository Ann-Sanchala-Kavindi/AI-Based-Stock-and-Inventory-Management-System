package com.Smart.Inventory.Prediction.System.service.impl;

import com.Smart.Inventory.Prediction.System.controller.request.CategoryRequest;
import com.Smart.Inventory.Prediction.System.controller.response.CategoryResponse;
import com.Smart.Inventory.Prediction.System.exception.NotFoundException;
import com.Smart.Inventory.Prediction.System.model.Category;
import com.Smart.Inventory.Prediction.System.repository.CategoryRepository;
import com.Smart.Inventory.Prediction.System.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;



    @Override
    public void create(CategoryRequest categoryRequest) {

        Category category=new Category();

        category.setName(categoryRequest.getName());
        category.setDescription(categoryRequest.getDescription());


        categoryRepository.save(category);
    }

    @Override
    public CategoryResponse getById(Long categoryId) {

        Category category=categoryRepository.findById(categoryId).orElseThrow(
                ()-> new NotFoundException("Given Category Not Available!!!!")
        );

        CategoryResponse categoryResponse=new CategoryResponse();

        categoryResponse.setId(category.getId());
        categoryResponse.setName(category.getName());
        categoryResponse.setDescription(category.getDescription());


        return categoryResponse;
    }

    @Override
    public List<CategoryResponse> getAll() {

        List<Category> categoryList= categoryRepository.findAll();

        List<CategoryResponse> categoryResponseList=new ArrayList<>();

        for(Category category:categoryList){

            CategoryResponse categoryResponse=new CategoryResponse();

            categoryResponse.setId(category.getId());
            categoryResponse.setName(category.getName());
            categoryResponse.setDescription(category.getDescription());

            categoryResponseList.add(categoryResponse);


        }
        return categoryResponseList;
    }

    @Override
    public void updateById(Long categoryId, CategoryRequest categoryRequest) {

        Category category=categoryRepository.findById(categoryId).orElseThrow(
                ()-> new NotFoundException("Given Category Not Found for Update")
        );

        category.setName(categoryRequest.getName());
        category.setDescription(categoryRequest.getDescription());

        categoryRepository.save(category);

    }

    @Override
    public void delete(Long categoryId) {

        categoryRepository.deleteById(categoryId);
    }


}
