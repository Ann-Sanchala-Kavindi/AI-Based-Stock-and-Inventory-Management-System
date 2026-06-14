package com.Smart.Inventory.Prediction.System.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name="predictions")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double  predictedDemand;
    private LocalDate predictionDate;
    private Double confidenceScore;
    private String algorithmUsed;

    @ManyToOne
    private Product product;

}
