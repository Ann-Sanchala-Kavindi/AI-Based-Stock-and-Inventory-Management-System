package com.Smart.Inventory.Prediction.System.repository;

import com.Smart.Inventory.Prediction.System.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findByUserId(Long userId);

    List<Notification> findByUserIdAndIsReadFalse(Long userId);
}
