package com.Smart.Inventory.Prediction.System.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="inventories")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long quantityInStock;
    private LocalDateTime lastRestockedDate;
    private String warehouseLocation;
    private Long reOrderLevel;


    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
