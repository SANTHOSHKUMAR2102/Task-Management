package com.taskManagement.taskmanagement.service;

import com.taskManagement.taskmanagement.entity.CurrentUser;
import com.taskManagement.taskmanagement.repository.CurrentUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrentUserService {

    @Autowired
    private CurrentUserRepository currentUserRepo;

    public CurrentUser storeCurrentUser(CurrentUser currentUser){
        return currentUserRepo.save(currentUser);
    }

    public List<CurrentUser> getCurrentUser() {
        return currentUserRepo.findAll();
    }

    public void truncateUser() {
        currentUserRepo.deleteAll();
    }


}
