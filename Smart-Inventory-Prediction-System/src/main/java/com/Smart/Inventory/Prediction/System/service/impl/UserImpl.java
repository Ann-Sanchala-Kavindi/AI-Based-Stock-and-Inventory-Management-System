package com.Smart.Inventory.Prediction.System.service.impl;

import com.Smart.Inventory.Prediction.System.controller.request.AuthRequest;
import com.Smart.Inventory.Prediction.System.model.Authority;
import com.Smart.Inventory.Prediction.System.model.User;
import com.Smart.Inventory.Prediction.System.repository.UserRepository;
import com.Smart.Inventory.Prediction.System.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@Component
@AllArgsConstructor
public class UserImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    @Transactional
    public void registerManager(AuthRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
                throw new RuntimeException("Username already exists");
            }

            User manager = new User();
            manager.setUsername(request.getUsername());
            manager.setPassword(passwordEncoder.encode(request.getPassword()));
            manager.setEnabled(true);

            Authority authority = new Authority();
            authority.setAuthority("ROLE_MANAGER");
            authority.setUser(manager);

            manager.setAuthorities(Collections.singletonList(authority));
            userRepository.save(manager);
    }


}
