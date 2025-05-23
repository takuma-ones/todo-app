package com.example.todo.controller.task;

import com.example.todo.service.task.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskDTO> list(TaskSearchForm searchForm) {
        return taskService.find(searchForm.toEntity()).stream()
                .map(TaskDTO::toDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public TaskDTO detail(@PathVariable long id) {
        return taskService.findById(id)
                .map(TaskDTO::toDTO)
                .orElseThrow(TaskNotFoundException::new);
    }

    @PostMapping
    public void create(@RequestBody @Validated TaskForm form) {
        taskService.create(form.toEntity());
    }

    @PutMapping("/{id}")
    public void update(@PathVariable long id, @RequestBody @Validated TaskForm form) {
        if (!taskService.existsById(id)) {
            throw new TaskNotFoundException();
        }
        taskService.update(form.toEntity(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        taskService.delete(id);
    }
}
