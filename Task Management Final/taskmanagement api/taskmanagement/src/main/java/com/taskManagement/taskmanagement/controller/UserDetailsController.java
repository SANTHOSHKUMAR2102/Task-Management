package com.taskManagement.taskmanagement.controller;

import com.taskManagement.taskmanagement.entity.UserDetails;
import com.taskManagement.taskmanagement.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/task")
    public List<UserDetails> getUserDetails(){
        return userDetailsService.getUsersAll();
    }

    @PostMapping("/user")
    public UserDetails storedUserData(@RequestBody UserDetails user){
        return userDetailsService.storeUserData(user);
    }
}
