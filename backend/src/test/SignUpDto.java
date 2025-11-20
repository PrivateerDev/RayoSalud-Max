package com.rayosalud.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SignUpDto {

    @NotBlank(message = "El nombre es requerido")
    private String name;

    @NotBlank(message = "El nombre de usuario es requerido")
    @Size(min = 3, max = 20, message = "El usuario debe tener entre 3 y 20 caracteres")
    private String username;

    @NotBlank(message = "El email es requerido")
    @Email(message = "Email invalido")
    private String email;

    @NotBlank(message = "La contrasena es requerida")
    @Size(min = 6, message = "La contrasena debe tener al menos 6 caracteres")
    private String password;

    // Getters y Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
