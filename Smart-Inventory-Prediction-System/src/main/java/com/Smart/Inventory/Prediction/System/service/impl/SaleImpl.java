package com.Smart.Inventory.Prediction.System.service.impl;

import com.Smart.Inventory.Prediction.System.controller.request.SaleItemRequest;
import com.Smart.Inventory.Prediction.System.controller.request.SaleRequest;
import com.Smart.Inventory.Prediction.System.controller.response.SaleItemResponse;
import com.Smart.Inventory.Prediction.System.controller.response.SaleResponse;
import com.Smart.Inventory.Prediction.System.model.*;
import com.Smart.Inventory.Prediction.System.repository.InventoryRepository;
import com.Smart.Inventory.Prediction.System.repository.ProductRepository;
import com.Smart.Inventory.Prediction.System.repository.SaleRepository;
import com.Smart.Inventory.Prediction.System.repository.UserRepository;
import com.Smart.Inventory.Prediction.System.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;


@Transactional
@RequiredArgsConstructor
@Service
public class SaleImpl implements SaleService {
    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;

    @Override
    public SaleResponse createSale(SaleRequest request) {

        User manager = userRepository.findById(request.getManagerId())
                .orElseThrow(() ->
                        new RuntimeException("Manager not found"));

        Sale sale = new Sale();
        sale.setManager(manager);
        sale.setPaymentMethod(request.getPaymentMethod());
        sale.setSaleDate(LocalDateTime.now());

        List<SaleItem> saleItems = new ArrayList<>();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (SaleItemRequest itemRequest : request.getSaleItems()) {

            Product product = productRepository.findById(
                    itemRequest.getProductId()
            ).orElseThrow(() ->
                    new RuntimeException("Product not found"));

            Inventory inventory = inventoryRepository
                    .findByProductId(product.getId())
                    .orElseThrow(() ->
                            new RuntimeException("Inventory not found"));

            if (inventory.getQuantityInStock()
                    < itemRequest.getQuantity()) {

                throw new RuntimeException(
                        product.getName() + " stock is insufficient"
                );
            }

            BigDecimal subTotal =
                    product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            SaleItem saleItem = new SaleItem();

            saleItem.setSale(sale);
            saleItem.setProduct(product);

            saleItem.setQuantity(
                    itemRequest.getQuantity()
            );

            saleItem.setUnitPrice(
                    product.getPrice()
            );

            saleItem.setSubTotal(subTotal);

            saleItems.add(saleItem);

            totalAmount=totalAmount.add(subTotal);

            inventory.setQuantityInStock(
                    inventory.getQuantityInStock()
                            - itemRequest.getQuantity()
            );

            inventoryRepository.save(inventory);

            if (inventory.getQuantityInStock()
                    <= inventory.getReOrderLevel()) {

                System.out.println(
                        "LOW STOCK ALERT : "
                                + product.getName()
                );
            }
        }

        sale.setSaleItems(saleItems);
        sale.setTotalAmount(totalAmount);

        Sale savedSale = saleRepository.save(sale);

        return mapToResponse(savedSale);
    }

    @Override
    public SaleResponse getSaleById(Long saleId) {

        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() ->
                        new RuntimeException("Sale not found"));

        return mapToResponse(sale);
    }

    @Override
    public List<SaleResponse> getAllSales() {

        return saleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(toList());
    }

    @Override
    public void deleteSale(Long saleId) {

        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() ->
                        new RuntimeException("Sale not found"));

        saleRepository.delete(sale);
    }

    private SaleResponse mapToResponse(Sale sale) {

        List<SaleItemResponse> itemResponses =
                sale.getSaleItems()
                        .stream()
                        .map(item ->
                                SaleItemResponse.builder()
                                        .productId(
                                                item.getProduct().getId()
                                        )
                                        .productName(
                                                item.getProduct().getName()
                                        )
                                        .quantity(
                                                item.getQuantity()
                                        )
                                        .unitPrice(
                                                item.getUnitPrice()
                                        )
                                        .subTotal(
                                                item.getSubTotal()
                                            )
                                        .build()
                        )
                        .toList();

        return SaleResponse.builder()
                .saleId(sale.getId())
                .saleDate(sale.getSaleDate())
                .totalAmount(sale.getTotalAmount())
                .paymentMethod(
                        sale.getPaymentMethod()
                )
                .managerName(
                        sale.getManager().getUsername()
                )
                .items(itemResponses)
                .build();
    }
}
