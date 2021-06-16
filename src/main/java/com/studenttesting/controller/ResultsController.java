package com.studenttesting.controller;

import com.studenttesting.model.QuizAnswers;
import com.studenttesting.model.QuizResult;
import com.studenttesting.service.QuizModelService;
import com.studenttesting.service.QuizResultService;
import com.studenttesting.users.ApplicationUser;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@RestController
@RequestMapping("/api/tests/results")
@CrossOrigin(origins="http://localhost:3000")
public class ResultsController {
    private final static Logger LOGGER = LoggerFactory.getLogger(ResultsController.class);
    private final QuizResultService resultService;
    private final QuizModelService quizModelService;

    @PostMapping("result")
    @ResponseStatus(HttpStatus.CREATED)
    public QuizResult postTestResultByAnswers(@RequestBody QuizAnswers answers, Authentication authentication) {
        ApplicationUser user = (ApplicationUser) authentication.getPrincipal();

        return quizModelService.getResult(answers.getAnswers(), answers.getTestId(), user.getId());
    }

    @PostMapping
    public List<QuizResult> getStudentResults(Authentication authentication) {
        ApplicationUser user = (ApplicationUser) authentication.getPrincipal();
        return resultService.getResultByStudentId(user.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizResult> getResult(@PathVariable String id) {
        Optional<QuizResult> result = resultService.findById(id);
        if (result.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(result.get());
    }

    @GetMapping("/test/{id}")
    public List<QuizResult> getQuizResults(@PathVariable String id) {
        return resultService.getResultsByTestId(id);
    }

    @GetMapping("/count")
    public Long getCount() {
        return resultService.count();
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteResult(@PathVariable String id) {
        resultService.delete(id);
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping
    public void deleteAllResults() {
        resultService.deleteAll();
    }


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}

