package com.rayosalud.backend.service;

import com.rayosalud.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class AuthService {

    // Lista en memoria
    private final List<User> users = new CopyOnWriteArrayList<>();

    // Agrega usuario (registro)
    public boolean register(User user) {
        boolean emailExists = users.stream()
                .anyMatch(u -> u.getEmail().equalsIgnoreCase(user.getEmail()));
        boolean usernameExists = users.stream()
                .anyMatch(u -> u.getUsername().equalsIgnoreCase(user.getUsername()));

        if (emailExists || usernameExists) {
            return false; // Usuario duplicado
        }
        users.add(user);
        return true;
    }

    // Autenticación simple (email y password)
    public User authenticate(String email, String password) {
        return users.stream()
                .filter(user -> user.getEmail().equalsIgnoreCase(email)
                        && user.getPassword().equals(password))
                .findFirst()
                .orElse(null);
    }

    // (Opcional) Puedes añadir getUserList para pruebas
    public List<User> getUsers() {
        return users;
    }
}
