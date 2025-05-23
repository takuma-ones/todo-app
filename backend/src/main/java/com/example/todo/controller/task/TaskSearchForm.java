package com.example.todo.controller.task;

import com.example.todo.service.task.TaskSearchEntity;
import com.example.todo.service.task.TaskStatus;

import java.util.List;
import java.util.Optional;

public record TaskSearchForm(
        String summary,
        List<String> statusList
) {

    public TaskSearchEntity toEntity() {
        var statusEntityList = Optional.ofNullable(statusList())
                .map(statusList -> statusList.stream().map(TaskStatus::valueOf).toList())
                .orElse(List.of());

        return new TaskSearchEntity(
                summary(),
                statusEntityList
        );
    }

    public TaskSearchDTO toDTO() {
        return new TaskSearchDTO(
                summary(),
                statusList()
        );
    }
}
