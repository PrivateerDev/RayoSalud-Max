package com.rayosalud.backend.repository;

import com.rayosalud.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.activo = true")
    Optional<User> findByEmailAndActivoTrue(@Param("email") String email);
    
    Optional<User> findByEmail(String email);
}
