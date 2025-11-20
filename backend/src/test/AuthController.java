package com.rayosalud.controller;

import com.rayosalud.dto.SignUpDto;
import com.rayosalud.entity.User;
import com.rayosalud.entity.Role;
import com.rayosalud.repository.UserRepository;
import com.rayosalud.repository.RoleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpDto signUpDto) {

        Map<String, String> response = new HashMap<>();

        if(userRepository.existsByUsername(signUpDto.getUsername())) {
            response.put("message", "El nombre de usuario ya esta en uso");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpDto.getEmail())) {
            response.put("message", "El email ya esta registrado");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setName(signUpDto.getName());
        user.setUsername(signUpDto.getUsername());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_PATIENT")
            .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        user.setRoles(Collections.singleton(userRole));
        userRepository.save(user);

        response.put("message", "Usuario registrado exitosamente");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
