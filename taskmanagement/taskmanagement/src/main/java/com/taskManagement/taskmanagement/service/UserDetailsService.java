package com.taskManagement.taskmanagement.service;

import com.taskManagement.taskmanagement.entity.UserDetails;
import com.taskManagement.taskmanagement.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public List<UserDetails> getUsersAll(){
        return userDetailsRepository.findAll();
    }

    public UserDetails storeUserData(UserDetails user){
        return userDetailsRepository.save(user);
    }
}
