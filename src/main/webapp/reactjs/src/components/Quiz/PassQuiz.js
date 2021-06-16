import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveUserQuiz, fetchUserQuiz, updateQuiz, fetchLanguages, fetchGenres} from '../../services/index';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import { withRouter } from 'react-router';

class PassQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        answers: {}
    };

    componentDidMount() {
        const quizId = this.props.match.params.id;
        if (quizId) {
           this.props.fetchUserQuiz(quizId);
        }
    }


    submitQuiz = event => {
        event.preventDefault();

        this.props.saveUserQuiz(this.prepareData());
        setTimeout(() => this.props.history.push('/user/result'), 1000);
    };

    prepareData = () => {
        const {id, questionList} = this.props.quizObject.quiz;
        return {
            testId: this.props.quizObject.quiz.id,
            answers: questionList.map(question => this.state.answers[question.title])
        }
    }

    render() {
        const {quiz} = this.props.quizObject;

        if (!quiz) {
            return null;
        }

        const { name, questionList } = quiz;
        const { answers } = this.state;
        const isSubmitDisabled = Object.entries(answers).length < questionList.length;

        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon
                            icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Quiz" : "Add New Quiz"}
                    </Card.Header>
                    <Form onSubmit={this.submitQuiz} id="quizFormId">
                        <Card.Body>
                            <h1>{name}</h1>

                            {questionList.map(this.renderQuestion)}
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button
                            disabled={isSubmitDisabled} size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Submit
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }

    renderQuestion = (question) => {
        const {title, answers} = question;
        return (
            <div key={title}>
                <h2>{title}</h2>

                {answers.map(answer => (
                     <div key={answer}>
                        <input
                            type="radio"
                            id={answer}
                            name={title}
                            value={answer}
                            onChange={e => this.changeAnswer(question, e.target.value)}
                            />
                        <label for={answer} style={{paddingLeft: 10}}>{answer}</label>
                     </div>
                 ))}
            </div>
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
        quizObject: state.quiz
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveUserQuiz: (quiz) => dispatch(saveUserQuiz(quiz)),
        fetchUserQuiz: (quizId) => dispatch(fetchUserQuiz(quizId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PassQuiz));