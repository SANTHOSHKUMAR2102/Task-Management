package com.taskManagement.taskmanagement.repository;

import com.taskManagement.taskmanagement.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Integer> {
}
