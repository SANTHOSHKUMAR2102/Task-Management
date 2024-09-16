package com.taskManagement.taskmanagement.service;

import com.taskManagement.taskmanagement.entity.TaskDetails;
import com.taskManagement.taskmanagement.repository.TaskDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskDetailsService {

    @Autowired
    private TaskDetailsRepository taskRepo;

    public TaskDetails saveTask(TaskDetails task){
        return taskRepo.save(task);
    }

    public TaskDetails getTaskById(int id) {
        return taskRepo.findById(id).orElse(null);
    }

    public List<TaskDetails> getTaskByRollNumber(int rollNumber){
        return taskRepo.findByRollNumber(rollNumber);
    }

    public List<TaskDetails> userTaskByRollNumber(int rollNumber){
        return taskRepo.findByRollNumber(rollNumber);
    }

    public void deleteTask(int id){
        taskRepo.deleteById(id);
    }
}
