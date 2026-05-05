package com.services.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

public class AdminDto {

    @Data
    public static class SignupRequest {
        @NotBlank(message = "Full name is required")
        private String fullName;

        @NotBlank(message = "Mobile number is required")
        @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be exactly 10 digits")
        private String mobile;

        @NotBlank(message = "Society name is required")
        private String societyName;

        @NotBlank(message = "Flat/House number is required")
        private String flatNo;

        @NotBlank(message = "Password is required")
        @Pattern(regexp = "^[0-9]{5}$", message = "Password must be exactly 5 digits")
        private String password;

        @NotBlank(message = "Confirm password is required")
        private String confirmPassword;
    }

    @Data
    public static class LoginRequest {
        @NotBlank(message = "Mobile number is required")
        @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be exactly 10 digits")
        private String mobile;

        @NotBlank(message = "Password is required")
        @Pattern(regexp = "^[0-9]{5}$", message = "Password must be exactly 5 digits")
        private String password;
    }

    @Data
    public static class ProfileResponse {
        private Long id;
        private String fullName;
        private String mobile;
        private String societyName;
        private String flatNo;
        private boolean verified;

        public ProfileResponse(Long id, String fullName, String mobile, String societyName, String flatNo, boolean verified) {
            this.id = id;
            this.fullName = fullName;
            this.mobile = mobile;
            this.societyName = societyName;
            this.flatNo = flatNo;
            this.verified = verified;
        }
    }

    @Data
    public static class ApiResponse {
        private boolean success;
        private String message;
        private Object data;

        public ApiResponse(boolean success, String message, Object data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
    }

    @Data
    public static class ForgotPasswordRequest {
        @NotBlank(message = "Mobile number is required")
        @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be exactly 10 digits")
        private String mobile;

        @NotBlank(message = "New password is required")
        @Pattern(regexp = "^[0-9]{5}$", message = "Password must be exactly 5 digits")
        private String newPassword;

        @NotBlank(message = "Confirm password is required")
        private String confirmPassword;
    }
    // ── Add these two classes inside AdminDto.java ──

    @Data
    public static class PersonalInfoRequest {
        @NotBlank(message = "Full name is required")
        private String fullName;

        @NotBlank(message = "Mobile number is required")
        @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be exactly 10 digits")
        private String mobile;

        @Email(message = "Invalid email address")
        private String email;

        private String dateOfBirth; // e.g. "15 Aug 1995"
        private String gender;
        private String occupation;
    }

    @Data
    public static class PersonalInfoResponse {
        private Long id;
        private String fullName;
        private String mobile;
        private String email;
        private String dateOfBirth;
        private String gender;
        private String occupation;
        private boolean verified;
      

        public PersonalInfoResponse(Long id, String fullName, String mobile,
                String email, String dateOfBirth,
                String gender, String occupation, boolean verified) {
            this.id = id;
            this.fullName = fullName;
            this.mobile = mobile;
            this.email = email;
            this.dateOfBirth = dateOfBirth;
            this.gender = gender;
            this.occupation = occupation;
            this.verified = verified;
           
        }
    }
}
