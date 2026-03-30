package org.example.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @PostConstruct
    public void init() {
        System.out.println(">>> SecurityConfig LOADED <<<");
    }

    /*
     * Configure the rules for securing the API endpoints.
     * - Disable CSRF (since we're using JWT and not cookies).
     * - Allow anyone to POST to /api/contacts (for contact form submissions).
     * - Require authentication for all other /api/** endpoints.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // público
                        .requestMatchers(HttpMethod.POST, "/api/contacts").permitAll()

                        // tudo o resto da API precisa de token
                        .requestMatchers("/api/**").authenticated()

                        // fora da API (se tiver páginas/static)
                        .anyRequest().permitAll()
                )
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> {})
                )
                .build();
    }
}
