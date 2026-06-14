package com.Smart.Inventory.Prediction.System.controller.request;

import com.Smart.Inventory.Prediction.System.model.Enum.NotificationType;
import lombok.Data;


@Data
public class NotificationRequest {

    private String title;
    private String message;
    private NotificationType type;
}
