package com.studenttesting.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.studenttesting.model.QuizModel;
import com.studenttesting.model.Views;
import com.studenttesting.service.QuizModelService;
import com.studenttesting.users.ApplicationUser;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/tests")
@CrossOrigin(origins="http://localhost:3000")
public class QuizController {

    private final static Logger LOGGER = LoggerFactory.getLogger(QuizController.class);
    private final QuizModelService quizModelService;


    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("test")
    @ResponseStatus(HttpStatus.CREATED)
    public QuizModel postQuizModel(@RequestBody QuizModel testModel, Authentication authentication) {
        ApplicationUser user = (ApplicationUser) authentication.getPrincipal();
        return quizModelService.save(testModel, user);
    }



    @GetMapping
    public ResponseEntity<Page<QuizModel>> getQuizModels(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(quizModelService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @GetMapping("all")
    public List<QuizModel> getAllQuizz() {
        return quizModelService.findAll();
    }

    @JsonView(Views.AdminUI.class)
    @GetMapping("test/admin/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<QuizModel> getAdminQuizModel(@PathVariable String id) {
        Optional<QuizModel> testModel = quizModelService.findOne(id);
        if (testModel.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(testModel.get());
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    @JsonView(Views.UserUI.class)
    @GetMapping("test/user/{id}")
    public ResponseEntity<QuizModel> getUserQuizModel(@PathVariable String id) {
        Optional<QuizModel> testModel = quizModelService.findOne(id);
        if (testModel.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(testModel.get());
    }

    @GetMapping("tests/count")
    public Long getCount() {
        return quizModelService.count();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("test/{id}")
    public String deleteQuizModel(@PathVariable String id) {
        return quizModelService.delete(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("tests")
    public void deleteQuizModels() {
        quizModelService.deleteAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("test")
    public QuizModel putQuizModel(@RequestBody QuizModel testModel) {
        return quizModelService.update(testModel);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
