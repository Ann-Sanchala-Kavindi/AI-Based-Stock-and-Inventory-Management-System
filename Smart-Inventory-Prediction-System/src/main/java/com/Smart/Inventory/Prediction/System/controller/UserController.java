package com.Smart.Inventory.Prediction.System.controller;

import com.Smart.Inventory.Prediction.System.controller.request.AuthRequest;
import com.Smart.Inventory.Prediction.System.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
public class UserController {


    private final UserService userService;


    @RolesAllowed("ADMIN")
    @PostMapping("/admin/register-manager")
    public ResponseEntity<String> registerManager(@RequestBody AuthRequest request) {
        userService.registerManager(request);
        return ResponseEntity.ok("Manager registered successfully");
    }



}
