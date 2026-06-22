package com.Smart.Inventory.Prediction.System.service.impl;

import com.Smart.Inventory.Prediction.System.controller.request.PurchaseOrderRequest;
import com.Smart.Inventory.Prediction.System.controller.response.PurchaseOrderResponse;
import com.Smart.Inventory.Prediction.System.exception.NotFoundException;
import com.Smart.Inventory.Prediction.System.model.*;
import com.Smart.Inventory.Prediction.System.model.Enum.PurchaseOrderStatus;
import com.Smart.Inventory.Prediction.System.repository.*;
import com.Smart.Inventory.Prediction.System.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PurchaseOrderImpl implements PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;

    @Override
    public PurchaseOrderResponse createOrder(PurchaseOrderRequest request, String username) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new NotFoundException("Product not found"));

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new NotFoundException("Supplier not found"));

        User orderedBy = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (request.getQuantityOrdered() == null || request.getQuantityOrdered() <= 0) {
            throw new RuntimeException("Quantity ordered must be greater than zero");
        }

        PurchaseOrder order = new PurchaseOrder();
        order.setProduct(product);
        order.setSupplier(supplier);
        order.setQuantityOrdered(request.getQuantityOrdered());
        order.setStatus(PurchaseOrderStatus.PENDING);
        order.setOrderedBy(orderedBy);

        PurchaseOrder saved = purchaseOrderRepository.save(order);
        return toResponse(saved);
    }

    @Override
    public List<PurchaseOrderResponse> getAllOrders() {
        return purchaseOrderRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PurchaseOrderResponse getOrderById(Long orderId) {
        PurchaseOrder order = purchaseOrderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Purchase order not found"));
        return toResponse(order);
    }

    @Override
    public PurchaseOrderResponse updateStatus(Long orderId, PurchaseOrderStatus newStatus) {

        PurchaseOrder order = purchaseOrderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Purchase order not found"));

        if (order.getStatus() != PurchaseOrderStatus.PENDING) {
            throw new RuntimeException(
                    "Order is already " + order.getStatus() + " — cannot change status"
            );
        }

        if (newStatus == PurchaseOrderStatus.RECEIVED) {
            // ✅ stock goes UP only here, when goods actually arrive
            Inventory inventory = inventoryRepository.findByProductId(order.getProduct().getId())
                    .orElseThrow(() -> new NotFoundException("Inventory not found for this product"));

            inventory.setQuantityInStock(
                    inventory.getQuantityInStock() + order.getQuantityOrdered()
            );
            inventory.setLastRestockedDate(LocalDateTime.now());
            inventoryRepository.save(inventory);

            order.setReceivedDate(LocalDateTime.now());
        }

        order.setStatus(newStatus);
        PurchaseOrder updated = purchaseOrderRepository.save(order);
        return toResponse(updated);
    }

    private PurchaseOrderResponse toResponse(PurchaseOrder order) {
        return PurchaseOrderResponse.builder()
                .id(order.getId())
                .productId(order.getProduct().getId())
                .productName(order.getProduct().getName())
                .supplierId(order.getSupplier().getId())
                .supplierName(order.getSupplier().getName())
                .quantityOrdered(order.getQuantityOrdered())
                .status(order.getStatus())
                .orderedByUsername(order.getOrderedBy().getUsername())
                .orderDate(order.getOrderDate())
                .receivedDate(order.getReceivedDate())
                .build();
    }
}