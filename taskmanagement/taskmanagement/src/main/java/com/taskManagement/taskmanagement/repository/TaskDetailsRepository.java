package com.taskManagement.taskmanagement.repository;

import com.taskManagement.taskmanagement.entity.TaskDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskDetailsRepository extends JpaRepository<TaskDetails, Integer> {
    List<TaskDetails> findByRollNumber(int rollNumber);
}
