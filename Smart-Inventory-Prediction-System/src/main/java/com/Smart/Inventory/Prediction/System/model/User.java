package com.Smart.Inventory.Prediction.System.model;

import com.Smart.Inventory.Prediction.System.model.Enum.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.prefs.Preferences;

@Data
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private LocalDateTime createdAt;
    private Boolean isActive;

    private Boolean enabled;



    @ToString.Exclude
    @OneToMany(mappedBy = "user")
    private List<Notification> notifications;

    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Authority> authorities;

    @OneToMany(mappedBy = "manager")
    private List<Sale> sales;


}


