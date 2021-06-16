package com.studenttesting.controller;

import com.studenttesting.registration.RegistrationRequest;
import com.studenttesting.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/registration")
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:3000")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping(path = "register")
    public boolean register(@RequestBody RegistrationRequest request) {
        return !registrationService.register(request).isEmpty();
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

}
