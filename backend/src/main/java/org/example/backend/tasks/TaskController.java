package org.example.backend.tasks;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final List<Task> tasks = new ArrayList<>();
    private final TaskRepository repository;

   /* @GetMapping
    public List<Task> getTasks() {
        // dados fake para testar o frontend
        return List.of(
                new Task(1L, "Estudar Spring Boot","Spring Boot é um otimo complemento", "TODO"),
                new Task(2L, "Criar frontend React", "Aplicaçao em React", "IN_PROGRESS"),
                new Task(3L, "Ligar backend e frontend","Ligar aplicaçao Java a React", "DONE")
        );
    }*/


    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Task> getTasks() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task updated
    ) {
        return repository.findById(id)
                .map(task -> {
                    task.setTitle(updated.getTitle());
                    task.setDescription(updated.getDescription());
                    task.setStatus(updated.getStatus());
                    repository.save(task);
                    return ResponseEntity.ok(task);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Task createTask(@RequestBody Task dto) {

        // Se não vier status, define um valor por defeito
        if (dto.getStatus() == null || dto.getStatus().isBlank()) {
            dto.setStatus("TODO");
        }
        // id é gerado pela BD
        Task saved = repository.save(dto);
        return saved;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    }


}
