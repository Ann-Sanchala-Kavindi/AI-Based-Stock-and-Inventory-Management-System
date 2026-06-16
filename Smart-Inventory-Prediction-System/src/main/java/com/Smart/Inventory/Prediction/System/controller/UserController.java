package com.Smart.Inventory.Prediction.System.controller;

import com.Smart.Inventory.Prediction.System.controller.request.AuthRequest;
import com.Smart.Inventory.Prediction.System.controller.request.ManagerRequest;
import com.Smart.Inventory.Prediction.System.model.User;
import com.Smart.Inventory.Prediction.System.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
public class UserController {


    private final UserService userService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/register-manager")
    public ResponseEntity<String> registerManager(@RequestBody AuthRequest request) {
        userService.registerManager(request);
        return ResponseEntity.ok("Manager registered successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/managers")
    public ResponseEntity<List<ManagerRequest>> getAllManagers() {
        return ResponseEntity.ok(userService.getAllManagers());
    }

    // ✅ Both admin and manager can view
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/managers")
    public ResponseEntity<List<ManagerRequest>> getManagers() {
        return ResponseEntity.ok(userService.getAllManagers());
    }



    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/managers/{id}")
    public ResponseEntity<String> deleteManager(@PathVariable Long id) {
        userService.deleteManager(id);
        return ResponseEntity.ok("Manager deleted successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/managers/{id}/toggle")
    public ResponseEntity<String> toggleManager(@PathVariable Long id) {
        userService.toggleManagerStatus(id);
        return ResponseEntity.ok("Status updated");
    }



}
