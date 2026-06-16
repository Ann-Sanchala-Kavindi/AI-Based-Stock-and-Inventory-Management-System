package com.Smart.Inventory.Prediction.System.service.impl;

import com.Smart.Inventory.Prediction.System.controller.request.AuthRequest;
import com.Smart.Inventory.Prediction.System.controller.request.ManagerRequest;
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
import java.util.List;
import java.util.stream.Collectors;

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
            manager.setIsActive(true);

            Authority authority = new Authority();
            authority.setAuthority("ROLE_MANAGER");
            authority.setUser(manager);

            manager.setAuthorities(Collections.singletonList(authority));
            userRepository.save(manager);
    }

    @Override
    public List<ManagerRequest> getAllManagers() {
        return userRepository.findAll()
                .stream()
                .filter(u -> u.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_MANAGER")))
                .filter(u -> u.getIsActive() != null)
                .map(u -> new ManagerRequest(
                        u.getId(),
                        u.getUsername(),
                        u.getIsActive(),
                        "ROLE_MANAGER"
                ))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteManager(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void toggleManagerStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getIsActive() == null || !user.getIsActive()) {
            user.setIsActive(true);   // if null or false → set true
        } else {
            user.setIsActive(false);  // if true → set false
        }

        userRepository.save(user);

    }


}
