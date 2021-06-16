package com.studenttesting.repository;

import com.studenttesting.users.ApplicationUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationUserRepository extends MongoRepository<ApplicationUser, String> {

    @Query("{'email':?0}")
    Optional<ApplicationUser> findByEmail(String email);
}
