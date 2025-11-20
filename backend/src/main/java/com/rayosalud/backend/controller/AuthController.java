package com.rayosalud.backend.controller;

import com.rayosalud.backend.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {
    // Lista en memoria de usuarios registrados
    private final List<User> users = new CopyOnWriteArrayList<>();

    // Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String correo = credentials.get("correo");
        String password = credentials.get("password");

        User user = users.stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(correo) && u.getPassword().equals(password))
                .findFirst()
                .orElse(null);

        if (user != null) {
            // El mensaje debe coincidir con tu frontend
            return ResponseEntity.ok("¡Bienvenido, " + user.getName() + "!");
        } else {
            return ResponseEntity.badRequest().body("Credenciales inválidas");
        }
    }

    // Endpoint de registro
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Validar email y username únicos
        boolean emailExists = users.stream()
                .anyMatch(u -> u.getEmail().equalsIgnoreCase(user.getEmail()));
        boolean usernameExists = users.stream()
                .anyMatch(u -> u.getUsername().equalsIgnoreCase(user.getUsername()));

        if (emailExists) {
            return ResponseEntity.badRequest().body(Map.of("message", "El email ya está registrado"));
        }
        if (usernameExists) {
            return ResponseEntity.badRequest().body(Map.of("message", "El usuario ya existe"));
        }

        users.add(user);
        return ResponseEntity.ok(Map.of("message", "Usuario registrado correctamente"));
    }
}
