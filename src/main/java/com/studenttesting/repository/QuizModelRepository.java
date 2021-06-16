package com.studenttesting.repository;

import com.studenttesting.model.QuizModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizModelRepository extends MongoRepository<QuizModel, ObjectId> {
}
