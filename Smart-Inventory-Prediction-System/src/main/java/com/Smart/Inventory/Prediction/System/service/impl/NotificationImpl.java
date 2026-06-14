package com.Smart.Inventory.Prediction.System.service.impl;

import com.Smart.Inventory.Prediction.System.controller.request.NotificationRequest;
import com.Smart.Inventory.Prediction.System.controller.response.NotificationResponse;
import com.Smart.Inventory.Prediction.System.model.Notification;
import com.Smart.Inventory.Prediction.System.model.User;
import com.Smart.Inventory.Prediction.System.repository.NotificationRepository;
import com.Smart.Inventory.Prediction.System.repository.UserRepository;
import com.Smart.Inventory.Prediction.System.service.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public NotificationResponse createNotification(
            Long userId,
            NotificationRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Notification notification = Notification.builder()
                .message(request.getMessage())
                .type(request.getType())
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        Notification savedNotification =
                notificationRepository.save(notification);

        return mapToResponse(savedNotification);
    }

    @Override
    public NotificationResponse getNotificationById(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Notification not found"));

        return mapToResponse(notification);
    }

    @Override
    public List<NotificationResponse> getAllNotifications() {

        return notificationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<NotificationResponse> getUserNotifications(Long userId) {

        return notificationRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public NotificationResponse markAsRead(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Notification not found"));

        notification.setIsRead(true);

        Notification updated =
                notificationRepository.save(notification);

        return mapToResponse(updated);
    }

    @Override
    public void deleteNotification(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Notification not found"));

        notificationRepository.delete(notification);
    }

    private NotificationResponse mapToResponse(
            Notification notification) {

        return NotificationResponse.builder()
                .id(notification.getId())

                .message(notification.getMessage())
                .type(notification.getType())
                .isRead(notification.getIsRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
