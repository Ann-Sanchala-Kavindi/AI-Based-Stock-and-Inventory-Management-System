package com.Smart.Inventory.Prediction.System.service;


import com.Smart.Inventory.Prediction.System.controller.request.AuthRequest;
import com.Smart.Inventory.Prediction.System.controller.request.ManagerRequest;
import com.Smart.Inventory.Prediction.System.model.User;

import java.util.List;

public interface UserService {

    void registerManager(AuthRequest request);
    List<ManagerRequest> getAllManagers();
    void deleteManager(Long id);
    void toggleManagerStatus(Long id);
}
