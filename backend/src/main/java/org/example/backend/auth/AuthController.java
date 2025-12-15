package org.example.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin // podes remover se já tens CORS global
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        // LOGIN TEMPORÁRIO (hardcoded)
        if ("admin".equals(request.getUsername())
                && "admin123".equals(request.getPassword())) {

            return ResponseEntity.ok().build(); // 200 OK
        }

        return ResponseEntity.status(401).body("Credenciais inválidas");
    }
}

