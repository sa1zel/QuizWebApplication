package com.studenttesting.controller;

import com.studenttesting.model.QuizModel;
import com.studenttesting.users.ApplicationUser;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/login")
public class LoginController {


    @PostMapping
    public boolean postLogin(Authentication authentication) {
        ApplicationUser user = (ApplicationUser) authentication.getPrincipal();
        return user.getAppUserRole().name().equals("ADMIN");
    }
}
