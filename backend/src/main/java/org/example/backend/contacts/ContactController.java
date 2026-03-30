package org.example.backend.contacts;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactRepository repo;


    //This is constructor injection, Spring will automatically provide an instance of ContactRepository when creating the ContactController.
    public ContactController(ContactRepository repo) {
        this.repo = repo;
    }

    //This endpoint returns all contacts.
    @GetMapping
    public List<Contact> getAllContacts() {
        return repo.findAll();
    }


    //With authentication, we can associate the contact message with the user who created for example..
    @PostMapping
    public Contact createContact(@org.springframework.validation.annotation.Validated
                                 @jakarta.validation.Valid @RequestBody CreateContactRequest dto,
                                 @AuthenticationPrincipal Jwt jwt) {

        Contact c = new Contact(dto.name(), dto.email(), dto.message());

        if (jwt != null) {
            c.setUserId(java.util.UUID.fromString(jwt.getSubject())); // sub
        }

        return repo.save(c);
    }

}
