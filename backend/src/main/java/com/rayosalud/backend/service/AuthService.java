package com.rayosalud.backend.service;

import com.rayosalud.backend.model.User;
import com.rayosalud.backend.repository.UserRepository;
import com.rayosalud.backend.exception.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User authenticate(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        User user = userOpt.get();

        if (!user.getActivo()) {
            throw new UnauthorizedException("Usuario inactivo");
        }

        if (!user.getPassword().equals(password)) {
            throw new UnauthorizedException("Credenciales inválidas");
        }

        return user;
    }
}