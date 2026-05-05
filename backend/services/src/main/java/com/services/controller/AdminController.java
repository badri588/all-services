package com.services.controller;

import com.services.dto.AdminDto;
import com.services.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/signup")
    public ResponseEntity<AdminDto.ApiResponse> signup(@Valid @RequestBody AdminDto.SignupRequest request) {
        AdminDto.ProfileResponse profile = adminService.signup(request);
        return ResponseEntity.ok(new AdminDto.ApiResponse(true, "Account created successfully", profile));
    }

    @PostMapping("/login")
    public ResponseEntity<AdminDto.ApiResponse> login(@Valid @RequestBody AdminDto.LoginRequest request) {
        AdminDto.ProfileResponse profile = adminService.login(request);
        return ResponseEntity.ok(new AdminDto.ApiResponse(true, "Login successful", profile));
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<AdminDto.ApiResponse> getProfile(@PathVariable Long id) {
        AdminDto.ProfileResponse profile = adminService.getProfile(id);
        return ResponseEntity.ok(new AdminDto.ApiResponse(true, "Profile fetched", profile));
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<AdminDto.ApiResponse> forgotPassword(
            @Valid @RequestBody AdminDto.ForgotPasswordRequest request) {
        adminService.resetPassword(request);
        return ResponseEntity.ok(new AdminDto.ApiResponse(true, "Password reset successfully"));
    }
    // ── Add these two endpoints inside AdminController.java ──

    @GetMapping("/{id}/personal-info")
    public ResponseEntity<AdminDto.ApiResponse> getPersonalInfo(@PathVariable Long id) {
        AdminDto.PersonalInfoResponse info = adminService.getPersonalInfo(id);
        return ResponseEntity.ok(new AdminDto.ApiResponse(true, "Personal info fetched", info));
    }

    @PutMapping("/{id}/personal-info")
    public ResponseEntity<AdminDto.ApiResponse> updatePersonalInfo(
            @PathVariable Long id,
            @Valid @RequestBody AdminDto.PersonalInfoRequest request) {
        AdminDto.PersonalInfoResponse info = adminService.updatePersonalInfo(id, request);
        return ResponseEntity.ok(new AdminDto.ApiResponse(true, "Personal info updated", info));
    }
}