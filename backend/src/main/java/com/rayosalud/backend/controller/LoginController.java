package com.rayosalud.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    // DTO (LoginRequest) debe estar DENTRO o como clase pública exterior
    public static class LoginRequest {
        private String correo;
        private String password;

        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        if ("admin@rayosalud.com".equals(loginRequest.getCorreo()) && "1234".equals(loginRequest.getPassword())) {
            return "¡Bienvenido admin@rayosalud.com! Acceso correcto";
        }
        return "Credenciales inválidas";
    }
}
