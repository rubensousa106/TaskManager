package org.example.backend.contacts;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactRepository repo;

    public ContactController(ContactRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Contact> getAllContacts() {
        return repo.findAll();
    }

    @PostMapping
    public Contact createContact(@RequestBody Contact dto) {
        Contact saved = repo.save(new Contact(dto.getName(), dto.getEmail(), dto.getMessage()));
        return saved;
    }
}
