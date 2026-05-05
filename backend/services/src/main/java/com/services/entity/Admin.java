package com.services.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "admins")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String fullName;

    @NotBlank
    @Column(nullable = false, unique = true, length = 10)
    private String mobile;

    @NotBlank
    @Column(nullable = false)
    private String societyName;

    @NotBlank
    @Column(nullable = false)
    private String flatNo;

    @NotBlank
    @Column(nullable = false)
    private String password;

    // ── Personal Information (optional, filled later) ──
    @Builder.Default
    @Column(nullable = false)
    private boolean verified = false;

    private String email;
    private String dateOfBirth;   // stored as "DD MMM YYYY" string e.g. "15 Aug 1995"
    private String gender;
    private String occupation;
   
}
