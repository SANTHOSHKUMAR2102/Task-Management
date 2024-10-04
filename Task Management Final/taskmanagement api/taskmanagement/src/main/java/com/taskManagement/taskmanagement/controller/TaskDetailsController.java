package com.taskManagement.taskmanagement.controller;

import com.taskManagement.taskmanagement.entity.TaskDetails;
import com.taskManagement.taskmanagement.service.TaskDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskDetailsController {

    @Autowired
    private TaskDetailsService taskService;

    @PostMapping("/task")
    public TaskDetails addTask(@RequestBody TaskDetails task){
        return taskService.saveTask(task);
    }

    @GetMapping("/task/user/{rollNumber}")
    public List<TaskDetails> getTaskByRollNumber(@PathVariable int rollNumber){
        return taskService.getTaskByRollNumber(rollNumber);
    }

    @GetMapping("/currentUser/tasks/{rollNumber}")
    public List<TaskDetails> userGetTaskByRollNumber(@PathVariable int rollNumber){
        return taskService.userTaskByRollNumber(rollNumber);
    }

    @PutMapping("/currentUser/tasks/process/{id}")
    public ResponseEntity<TaskDetails> updateTaskProcess(@PathVariable int id, @RequestBody TaskDetails updatedTask) {
        TaskDetails existingTask = taskService.getTaskById(id);
        if (existingTask != null) {
            existingTask.setProcess(updatedTask.isProcess());
            TaskDetails updated = taskService.saveTask(existingTask);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/currentUser/tasks/completed/{id}")
    public ResponseEntity<TaskDetails> updateTaskCompleted(@PathVariable int id, @RequestBody TaskDetails updatedTask) {
        TaskDetails existingTask = taskService.getTaskById(id);
        if (existingTask != null) {
            existingTask.setCompleted(updatedTask.isCompleted());
            TaskDetails updated = taskService.saveTask(existingTask);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/currentUser/tasks/edit/{id}")
    public ResponseEntity<TaskDetails> updateTaskEdit(@PathVariable int id, @RequestBody TaskDetails updatedTask) {
        TaskDetails existingTask = taskService.getTaskById(id);
        if (existingTask != null) {
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setTaskDate(updatedTask.getTaskDate());
            TaskDetails updated = taskService.saveTask(existingTask);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<TaskDetails> deleteTask(@PathVariable int id){
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

}
