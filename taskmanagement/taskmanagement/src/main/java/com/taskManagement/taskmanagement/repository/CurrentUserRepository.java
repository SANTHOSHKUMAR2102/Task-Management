package com.taskManagement.taskmanagement.repository;

import com.taskManagement.taskmanagement.entity.CurrentUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrentUserRepository extends JpaRepository<CurrentUser, Integer> {

}
