package com.studenttesting.service;

import com.studenttesting.registration.ConfirmationToken;
import com.studenttesting.repository.ConfirmationTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }


    
    public void setConfirmedAt(String token) {
        Optional<ConfirmationToken> confirmationToken = confirmationTokenRepository.findByToken(token);
        boolean tokenPresent = confirmationToken.isPresent();
        if (tokenPresent) {
            ConfirmationToken confToken = confirmationToken.get();
            confirmationTokenRepository.delete(confToken);
            confToken.setConfirmedAt(LocalDateTime.now());
            confirmationTokenRepository.insert(confToken);
        }
    }

    public String updateExpiresAt(String email) {
        Optional<ConfirmationToken> confirmationToken = confirmationTokenRepository.findByUserEmail(email);
        boolean tokenPresent = confirmationToken.isPresent();
        String token = "";
        if (tokenPresent) {
            ConfirmationToken confToken = confirmationToken.get();
            token = confToken.getToken();
            confirmationTokenRepository.delete(confToken);
            confToken.setExpiresAt(LocalDateTime.now().plusMinutes(15));
            confirmationTokenRepository.insert(confToken);
        }
        return token;
    }
}
