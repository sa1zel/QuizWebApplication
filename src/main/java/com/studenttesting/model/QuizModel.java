package com.studenttesting.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Document("quizModel")
public class QuizModel {

    @JsonSerialize(using = ToStringSerializer.class)
    @MongoId
    @JsonView(Views.UserUI.class)
    private ObjectId id;
    @JsonView(Views.UserUI.class)
    private String name;
    @JsonView(Views.UserUI.class)
    private String creator;
    @JsonView(Views.UserUI.class)
    private Date createdAt;
    @JsonView(Views.UserUI.class)
    private Date lastChange;
    @JsonView(Views.UserUI.class)
    private List<Question> questionList;

    public QuizModel(String name, List<Question> questionList) {
        this.id = new ObjectId();
        this.name = name;
        this.createdAt = new Date();
        this.questionList = questionList;
    }


    public int checkQuiz(List<String> answers) {
        int total = 0;
        if (answers.size() == questionList.size()) {
            for (int i = 0; i < answers.size(); i++) {
                Question question = questionList.get(i);
                if(question.getRightAnswer().equals(answers.get(i))){
                    total+=1;
                }
            }
        }
        return total;
    }
}