package com.Smart.Inventory.Prediction.System.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "authorities")
public class Authority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String authority;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
