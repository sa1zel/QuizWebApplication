package com.studenttesting.repository;

import com.studenttesting.model.QuizModel;
import com.studenttesting.model.QuizResult;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends MongoRepository<QuizResult, ObjectId> {
    @Query("{'studentId':?0}")
    List<QuizResult> findAllByStudentId(ObjectId studentId);

    @Query("{'testId':?0}")
    List<QuizResult> findAllByTestId(ObjectId testId);
}
