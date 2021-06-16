package com.studenttesting.service;

import com.studenttesting.model.QuizModel;
import com.studenttesting.model.QuizResult;
import com.studenttesting.repository.ResultRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class QuizResultService {

    private ResultRepository resultRepository;

    public QuizResult save(QuizResult result) {
        QuizResult savedResult = resultRepository.save(result);
        return savedResult;
    }

    public Optional<QuizResult> findById(String id) {
        return resultRepository.findById(new ObjectId(id));
    }

    public Long count() {
        return resultRepository.count();
    }


    public void delete(String id) {
        resultRepository.deleteById(new ObjectId(id));
    }

    public void deleteAll() {
        resultRepository.deleteAll();
    }


    public List<QuizResult> getResultByStudentId(ObjectId id) {
        return resultRepository.findAllByStudentId(id);
    }

    public List<QuizResult> getResultsByTestId(String id) {
        return resultRepository.findAllByTestId(new ObjectId(id));
    }
}
