package com.Smart.Inventory.Prediction.System.model;

import com.Smart.Inventory.Prediction.System.model.Enum.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String companyName;
    private String email;
    private String phoneNo;
    private String address;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToMany(mappedBy = "suppliers")
    private List<Product> products;

}
