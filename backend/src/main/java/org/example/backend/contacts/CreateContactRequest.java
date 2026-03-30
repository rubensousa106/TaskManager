package org.example.backend.contacts;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/*
    * This is a DTO (Data Transfer Object) that represents the data needed to create a new contact message.
    * The fields include:
    * - name: The name of the person sending the contact message.
    * - email: The email address of the person sending the contact message.
    * - message: The content of the contact message.
 */
public record CreateContactRequest(
        @NotBlank @Size(max = 255) String name,
        @NotBlank @Email @Size(max = 255) String email,
        @Size(max = 2000) String message
) {}
