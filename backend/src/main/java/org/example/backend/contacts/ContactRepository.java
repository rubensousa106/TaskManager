package org.example.backend.contacts;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByUserId(UUID userId);}
