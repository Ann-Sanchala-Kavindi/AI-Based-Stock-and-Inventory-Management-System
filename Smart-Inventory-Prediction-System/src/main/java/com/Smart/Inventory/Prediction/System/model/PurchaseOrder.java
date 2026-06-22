package com.Smart.Inventory.Prediction.System.model;

import com.Smart.Inventory.Prediction.System.model.Enum.PurchaseOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="purchaseOrders")
public class PurchaseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    private Long quantityOrdered;

    @Enumerated(EnumType.STRING)
    private PurchaseOrderStatus status;

    @ManyToOne
    @JoinColumn(name = "ordered_by")
    private User orderedBy;          // manager or admin who placed the order

    private LocalDateTime orderDate;
    private LocalDateTime receivedDate;   // null until marked RECEIVED

    @PrePersist
    public void prePersist() {
        orderDate = LocalDateTime.now();
        if (status == null) {
            status = PurchaseOrderStatus.PENDING;
        }
    }
}
