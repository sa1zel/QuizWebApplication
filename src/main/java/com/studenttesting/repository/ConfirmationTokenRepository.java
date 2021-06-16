package com.studenttesting.repository;


import com.studenttesting.registration.ConfirmationToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ConfirmationTokenRepository extends MongoRepository<ConfirmationToken, Long> {

    @Query("{'token':?0}")
    Optional<ConfirmationToken> findByToken(String token);


    @Query("{'userEmail':?0}")
    Optional<ConfirmationToken> findByUserEmail(String userEmail);
}
