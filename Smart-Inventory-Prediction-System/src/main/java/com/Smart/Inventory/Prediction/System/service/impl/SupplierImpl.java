package com.Smart.Inventory.Prediction.System.service.impl;

import com.Smart.Inventory.Prediction.System.controller.request.SupplierRequest;
import com.Smart.Inventory.Prediction.System.controller.response.SupplierResponse;
import com.Smart.Inventory.Prediction.System.exception.NotFoundException;
import com.Smart.Inventory.Prediction.System.model.Supplier;
import com.Smart.Inventory.Prediction.System.repository.SupplierRepository;
import com.Smart.Inventory.Prediction.System.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    @Override
    public void create(SupplierRequest request) {
        Supplier supplier = new Supplier();
        supplier.setName(request.getName());
        supplier.setCompanyName(request.getCompanyName());
        supplier.setEmail(request.getEmail());
        supplier.setPhoneNo(request.getPhoneNo());
        supplier.setAddress(request.getAddress());
        supplier.setStatus(request.getStatus());
        supplierRepository.save(supplier);
    }

    @Override
    public SupplierResponse getById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Supplier not found"));
        return toResponse(supplier);
    }

    @Override
    public List<SupplierResponse> getAll() {
        return supplierRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void updateById(Long id, SupplierRequest request) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Supplier not found for update"));
        supplier.setName(request.getName());
        supplier.setCompanyName(request.getCompanyName());
        supplier.setEmail(request.getEmail());
        supplier.setPhoneNo(request.getPhoneNo());
        supplier.setAddress(request.getAddress());
        supplier.setStatus(request.getStatus());
        supplierRepository.save(supplier);
    }

    @Override
    public void delete(Long id) {
        supplierRepository.deleteById(id);
    }

    private SupplierResponse toResponse(Supplier supplier) {
        SupplierResponse response = new SupplierResponse();
        response.setId(supplier.getId());
        response.setName(supplier.getName());
        response.setCompanyName(supplier.getCompanyName());
        response.setEmail(supplier.getEmail());
        response.setPhoneNo(supplier.getPhoneNo());
        response.setAddress(supplier.getAddress());
        response.setStatus(supplier.getStatus());
        return response;
    }
}
