package com.studenttesting.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.*;

@Getter
@Setter
@Document("quizResult")
public class QuizResult {

    @JsonSerialize(using = ToStringSerializer.class)
    @MongoId
    private ObjectId id;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId testId;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId studentId;
    private String testTitle;
    private int sum;
    private Date passedAt;
    private List<String> answers;

    public QuizResult(ObjectId testId, ObjectId studentId, String testTitle, int sum, List<String> answers) {
        this.testId = testId;
        this.testTitle = testTitle;
        this.studentId = studentId;
        this.sum = sum;
        this.passedAt = new Date();
        this.answers = answers;
    }
}
