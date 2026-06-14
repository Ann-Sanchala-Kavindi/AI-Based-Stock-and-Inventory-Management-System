package com.Smart.Inventory.Prediction.System.service;

import com.Smart.Inventory.Prediction.System.controller.request.NotificationRequest;
import com.Smart.Inventory.Prediction.System.controller.response.NotificationResponse;

import java.util.List;

public interface NotificationService {

    NotificationResponse createNotification(
            Long userId,
            NotificationRequest request);

    NotificationResponse getNotificationById(Long id);

    List<NotificationResponse> getAllNotifications();

    List<NotificationResponse> getUserNotifications(Long userId);

    NotificationResponse markAsRead(Long id);

    void deleteNotification(Long id);
}
