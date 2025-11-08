package com.rayosalud.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.rayosalud.backend"})
public class RayoSaludApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(RayoSaludApiApplication.class, args);
    }
}

