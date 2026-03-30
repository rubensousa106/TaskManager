package org.example.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        /*
            * Test Login: For demonstration purposes, we are using hardcoded credentials.
                * In a real application, we need validate the credentials against a database
                * and generate a JWT token if the credentials are valid.
         */
        if ("admin".equals(request.getUsername())
                && "admin123".equals(request.getPassword())) {

            return ResponseEntity.ok().build(); // 200 OK
        }

        return ResponseEntity.status(401).body("Credenciais inválidas");
    }
}

