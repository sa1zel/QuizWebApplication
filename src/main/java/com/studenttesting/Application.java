package com.studenttesting;

import com.studenttesting.model.Question;
import com.studenttesting.model.QuizModel;
import com.studenttesting.model.QuizResult;
import com.studenttesting.repository.ResultRepository;
import com.studenttesting.service.QuizModelService;
import com.studenttesting.service.QuizResultService;
import com.studenttesting.users.ApplicationUser;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@AllArgsConstructor
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
