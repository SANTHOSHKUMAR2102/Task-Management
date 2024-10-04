package com.taskManagement.taskmanagement.controller;

import com.taskManagement.taskmanagement.entity.CurrentUser;

import com.taskManagement.taskmanagement.service.CurrentUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin (origins = "http://localhost:3000")
@RequestMapping("/api")
public class CurrentUserController {

    @Autowired
    private CurrentUserService currentUserService;

    @GetMapping("/currentUser/tasks")
    public List<CurrentUser> getCurrentUser(){
        return currentUserService.getCurrentUser();
    }

    @PostMapping("/currentUser")
    public CurrentUser storedUserData(@RequestBody CurrentUser user){
        return currentUserService.storeCurrentUser(user);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout() {
        currentUserService.truncateUser();
        return ResponseEntity.noContent().build();
    }


}
