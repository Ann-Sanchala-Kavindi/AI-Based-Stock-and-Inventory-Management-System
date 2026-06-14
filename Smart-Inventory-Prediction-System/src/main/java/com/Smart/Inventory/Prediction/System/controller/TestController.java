package com.Smart.Inventory.Prediction.System.controller;

import jakarta.annotation.security.RolesAllowed;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class TestController {

    @GetMapping("/auth-info")
    public ResponseEntity<?> getAuthInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Map<String, Object> info = new HashMap<>();
        info.put("isAuthenticated", auth.isAuthenticated());
        info.put("principal", auth.getPrincipal());
        info.put("authorities", auth.getAuthorities());
        info.put("details", auth.getDetails());

        log.info("Debug endpoint accessed. Auth info: {}", info);

        return ResponseEntity.ok(info);
    }

    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("authentication object of non-authenticated user [{}]", authentication);
        return ResponseEntity.ok("This is a public endpoint - accessible by anyone");
    }

    @GetMapping("/restricted")
    public ResponseEntity<String> authenticatedEndpoint() {
        return ResponseEntity.ok("This is a restricted/secured endpoint - accessible by any authenticated user");
    }

    @RolesAllowed({"USER"})
    @GetMapping("/user")
    public ResponseEntity<String> userEndpoint(@AuthenticationPrincipal User user) {
        log.info("@AuthenticationPrincipal of user [{}]", user);
        return ResponseEntity.ok("This is a user endpoint - accessible by ROLE_USER");
    }

    @RolesAllowed("ADMIN")
    @GetMapping("/admin")
    public ResponseEntity<String> adminEndpoint() {
        return ResponseEntity.ok("This is an admin endpoint - accessible only by ROLE_ADMIN");
    }

    @RolesAllowed({"ADMIN", "USER"})
    @GetMapping("/profile")
    public ResponseEntity<String> profileEndpoint() {
        return ResponseEntity.ok("This is an admin endpoint - accessible ROLE_ADMIN OR ROLE_USER");
    }


}
