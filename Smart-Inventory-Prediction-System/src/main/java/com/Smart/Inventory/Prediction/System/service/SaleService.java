package com.Smart.Inventory.Prediction.System.service;

import com.Smart.Inventory.Prediction.System.controller.request.SaleRequest;
import com.Smart.Inventory.Prediction.System.controller.response.SaleResponse;

import java.util.List;

public interface SaleService {


    SaleResponse createSale(SaleRequest request, String username);

    SaleResponse getSaleById(Long saleId);

    List<SaleResponse> getAllSales();

    void deleteSale(Long saleId);
}
