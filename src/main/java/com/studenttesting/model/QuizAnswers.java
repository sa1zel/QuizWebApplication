package com.studenttesting.model;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

import java.util.List;

@Setter
@Getter
public class QuizAnswers {

    List<String> answers;
    @JsonSerialize(using = ToStringSerializer.class)
    ObjectId testId;

    public QuizAnswers(List<String> answers, ObjectId testId) {
        this.answers = answers;
        this.testId = testId;
    }
}
