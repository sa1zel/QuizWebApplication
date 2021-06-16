package com.studenttesting.service;

import com.studenttesting.email.EmailSender;
import com.studenttesting.email.EmailService;
import com.studenttesting.registration.ConfirmationToken;
import com.studenttesting.repository.ApplicationUserRepository;
import com.studenttesting.users.ApplicationUser;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ApplicationUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";

    private final ApplicationUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(ApplicationUser appUser) {
        Optional<ApplicationUser> user = appUserRepository.findByEmail(appUser.getEmail());
        boolean userExists = user.isPresent();
        if (userExists) {
            if (user.get().getEnabled()) {
                throw new IllegalStateException("email already taken");
            } else {
//                String token = confirmationTokenService.updateExpiresAt(appUser.getEmail());
//                emailService.sendEmail(appUser.getEmail(), appUser.getFirstName(), token);
            }
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);

        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser.getEmail()
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);


        return token;
    }

    public void enableAppUser(String email) {
        Optional<ApplicationUser> user = appUserRepository.findByEmail(email);
        boolean userExists = user.isPresent();
        if (userExists) {
            ApplicationUser appUser = user.get();
            appUser.setEnabled(true);
            appUserRepository.deleteById(appUser.getId().toString());
            appUserRepository.insert(appUser);
        }
    }
}
