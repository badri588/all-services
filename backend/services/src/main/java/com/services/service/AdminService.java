package com.services.service;

import com.services.dto.AdminDto;
import com.services.entity.Admin;
import com.services.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public AdminDto.ProfileResponse signup(AdminDto.SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        if (adminRepository.existsByMobile(request.getMobile())) {
            throw new IllegalArgumentException("Mobile number already registered");
        }

        Admin admin = Admin.builder()
                .fullName(request.getFullName())
                .mobile(request.getMobile())
                .societyName(request.getSocietyName())
                .flatNo(request.getFlatNo())
                .password(request.getPassword()) // hash in production
                .verified(false)
                .build();

        Admin saved = adminRepository.save(admin);
        return toProfile(saved);
    }

    public AdminDto.ProfileResponse login(AdminDto.LoginRequest request) {
        Admin admin = adminRepository.findByMobile(request.getMobile())
                .orElseThrow(() -> new IllegalArgumentException("Mobile number not registered"));

        if (!admin.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Incorrect password");
        }

        return toProfile(admin);
    }

    public AdminDto.ProfileResponse getProfile(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));
        return toProfile(admin);
    }

    private AdminDto.ProfileResponse toProfile(Admin admin) {
        return new AdminDto.ProfileResponse(
                admin.getId(),
                admin.getFullName(),
                admin.getMobile(),
                admin.getSocietyName(),
                admin.getFlatNo(),
                admin.isVerified());
    }

    public void resetPassword(AdminDto.ForgotPasswordRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        Admin admin = adminRepository.findByMobile(request.getMobile())
                .orElseThrow(() -> new IllegalArgumentException("Mobile number not registered"));
        admin.setPassword(request.getNewPassword());
        adminRepository.save(admin);
    }

    // ── Add these two methods inside AdminService.java ──

    public AdminDto.PersonalInfoResponse getPersonalInfo(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));
        return toPersonalInfo(admin);
    }

    public AdminDto.PersonalInfoResponse updatePersonalInfo(Long id, AdminDto.PersonalInfoRequest request) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));

        // If mobile is being changed, check uniqueness
        if (!admin.getMobile().equals(request.getMobile())) {
            if (adminRepository.existsByMobile(request.getMobile())) {
                throw new IllegalArgumentException("Mobile number already in use");
            }
        }

        admin.setFullName(request.getFullName());
        admin.setMobile(request.getMobile());
        admin.setEmail(request.getEmail());
        admin.setDateOfBirth(request.getDateOfBirth());
        admin.setGender(request.getGender());
        admin.setOccupation(request.getOccupation());

        Admin saved = adminRepository.save(admin);
        return toPersonalInfo(saved);
    }

    private AdminDto.PersonalInfoResponse toPersonalInfo(Admin admin) {
        return new AdminDto.PersonalInfoResponse(
                admin.getId(),
                admin.getFullName(),
                admin.getMobile(),
                admin.getEmail(),
                admin.getDateOfBirth(),
                admin.getGender(),
                admin.getOccupation(),
                admin.isVerified()
            );
                
    }
}
