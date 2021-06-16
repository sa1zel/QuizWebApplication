package com.studenttesting.model;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import java.util.List;

@Data
public class Question {
    @JsonView(Views.UserUI.class)
    private String title;
    @JsonView(Views.UserUI.class)
    private List<String> answers;
    @JsonView(Views.AdminUI.class)
    private String rightAnswer;
}
