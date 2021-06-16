package com.studenttesting.service;

import com.studenttesting.model.QuizModel;
import com.studenttesting.model.QuizResult;
import com.studenttesting.repository.QuizModelRepository;
import com.studenttesting.users.ApplicationUser;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class QuizModelService {

    private QuizModelRepository quizModelRepository;
    private QuizResultService resultService;


    public QuizResult getResult(List<String> testAnswers, ObjectId testId, ObjectId studentId) {
        Optional<QuizModel> model = quizModelRepository.findById(testId);
        int result = model.get().checkQuiz(testAnswers);
        QuizResult testResult = new QuizResult(testId, studentId,model.get().getName(), result, testAnswers);
        return resultService.save(testResult);
    }


    public QuizModel save(QuizModel quizModel, ApplicationUser user) {
        quizModel.setCreator(user.getFirstName() + " " + user.getLastName());
        quizModel.setLastChange(new Date());
        quizModelRepository.save(quizModel);
        return quizModel;
    }

    public List<QuizModel> findAll() {
        return quizModelRepository.findAll();
    }

    public Page<QuizModel> findAll(Pageable pageable) {
        return quizModelRepository.findAll(pageable);
    }

//    public Page<QuizModel> findAll(Pageable pageable) {
//        return quizModelRepository.findAll(pageable);
//    }

    public Optional<QuizModel> findOne(String id) {
        return quizModelRepository.findById(new ObjectId(id));
    }

    public Long count() {
        return quizModelRepository.count();
    }

    public String delete(String id) {
        quizModelRepository.deleteById(new ObjectId(id));
        return id;
    }

    public void deleteAll() {
        quizModelRepository.deleteAll();
    }

    public QuizModel update(QuizModel quizModel) {
        quizModelRepository.deleteById(quizModel.getId());
        quizModel.setLastChange(new Date());
        quizModelRepository.insert(quizModel);
        return quizModel;
    }


}
