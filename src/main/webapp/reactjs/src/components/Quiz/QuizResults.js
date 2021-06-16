import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveUserQuiz, fetchUserQuiz, updateQuiz, fetchLanguages, fetchGenres} from '../../services/index';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import { withRouter } from 'react-router'

class QuizResults extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const userQuizResult = this.props.userQuizResult;

        if (!userQuizResult) {
             this.props.history.push('/');
             return null;
        }

        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <h1>{userQuizResult.testTitle}</h1>
                <h2>Your quiz score: {userQuizResult.sum}</h2>
            </Card>
        );
    }

    renderQuestion = (question) => {
        const {title, answers} = question;
        return (
            <Form.Row key={question.id}>
                <h2>{title}</h2>

                {answers.map(answer => (
                     <span key={answer}>
                        <input
                            type="radio"
                            id={answer}
                            name={title}
                            value={answer}
                            onChange={e => this.changeAnswer(question, e.target.value)}
                            />
                        <label for={answer}>{answer}</label>
                     </span>
                 ))}
            </Form.Row>
        )
    }
    changeAnswer = (question, value) => {
        const {answers} = this.state;
        answers[question.title]=value;
        this.setState({answers})
    }
};


const mapStateToProps = state => {
    return {
        userQuizResult: state.quiz.userQuizResult,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuizResults));