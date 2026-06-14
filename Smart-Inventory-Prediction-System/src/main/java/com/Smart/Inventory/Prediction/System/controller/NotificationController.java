package com.Smart.Inventory.Prediction.System.controller;

import com.Smart.Inventory.Prediction.System.controller.request.NotificationRequest;
import com.Smart.Inventory.Prediction.System.controller.response.NotificationResponse;
import com.Smart.Inventory.Prediction.System.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<NotificationResponse> createNotification(
            @PathVariable Long userId,
            @RequestBody NotificationRequest request) {

        return ResponseEntity.ok(
                notificationService.createNotification(
                        userId,
                        request)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificationResponse> getNotification(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.getNotificationById(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<NotificationResponse>>
    getAllNotifications() {

        return ResponseEntity.ok(
                notificationService.getAllNotifications()
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationResponse>>
    getUserNotifications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.getUserNotifications(userId)
        );
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<NotificationResponse> markAsRead(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.markAsRead(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return ResponseEntity.ok(
                "Notification deleted successfully"
        );
    }
}
