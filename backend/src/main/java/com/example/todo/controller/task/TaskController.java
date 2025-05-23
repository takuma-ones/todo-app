package com.example.todo.controller.task;

import com.example.todo.service.task.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController {

    // タスクサービスのインスタンスを作成
    private final TaskService taskService;

    @GetMapping
    public String list(TaskSearchForm searchForm, Model model) {

        List<TaskDTO> taskList = taskService.find(searchForm.toEntity())
                .stream()
                .map(TaskDTO::toDTO)
                .toList();

        model.addAttribute("taskList", taskList);
        model.addAttribute("taskSearch", searchForm.toDTO());
        return "tasks/list";
    }

    @GetMapping("/{id}")
    public String showDetail(@PathVariable("id") long id, Model model) {
        TaskDTO task = taskService.findById(id)
                .map(TaskDTO::toDTO)
                .orElseThrow(TaskNotFoundException::new);
        model.addAttribute("task", task);
        return "tasks/detail";
    }

    @GetMapping("/create")
    public String showCreateForm(@ModelAttribute TaskForm form) {
        return "tasks/create";
    }

    @PostMapping("/create")
    public String create(@Validated TaskForm form, BindingResult result) {

        // バリデーションエラーがある場合は、エラーメッセージを表示する
        if (result.hasErrors()) {
            return showCreateForm(form);
        }

        // タスクを作成する
        taskService.create(form.toEntity());

        return "redirect:/tasks";
    }

    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable("id") long id, Model model) {
        TaskForm task = taskService.findById(id)
                .map(TaskForm::fromEntity)
                .orElseThrow(TaskNotFoundException::new);
        model.addAttribute("taskForm", task);
        return "tasks/edit";
    }


    @PutMapping("/{id}/update")
    public String update(@PathVariable("id") long id, @Validated @ModelAttribute TaskForm form, BindingResult result, Model model) {

        if (!taskService.existsById(id)) {
            throw new TaskNotFoundException();
        }

        if (result.hasErrors()) {
            model.addAttribute("taskForm", form);
            return "tasks/edit";
        }

        // タスクを更新する
        taskService.update(form.toEntity(id));

        return "redirect:/tasks/{id}";
    }

    @DeleteMapping("/{id}/delete")
    public String delete(@PathVariable("id") long id) {
        taskService.delete(id);
        return "redirect:/tasks";
    }

}
