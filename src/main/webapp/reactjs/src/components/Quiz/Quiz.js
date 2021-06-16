import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveQuiz, fetchQuiz, updateQuiz, fetchLanguages, fetchGenres} from '../../services/index';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        // this.quizChange = this.quizChange.bind(this);
        this.submitQuiz = this.submitQuiz.bind(this);
    }

    initialState = {
        id: '', name: '', questions: []
    };

    componentDidMount() {
        const quizId = +this.props.match.params.id;
        if (quizId) {
            this.findQuizById(quizId);
        }
    }

    findQuizById = (quizId) => {
        this.props.fetchQuiz(quizId);
        setTimeout(() => {
            let quiz = this.props.quizObject.quiz;
            if (quiz != null) {
                this.setState({
                    id: quiz.id,
                    title: quiz.title,
                    creator: quiz.creator
                });
            }
        }, 1000);
    };

    resetQuiz = () => {
        this.setState(() => this.initialState);
    };

    prepareData = () => {
        return {
            name: this.state.name,
            questionList: this.state.questions.map(question => {
                const rightAnswerQuestion = question.answers.find(answer => answer.id === question.correctAnswerId);
                return {
                    title: question.title,
                    answers: question.answers.map(answer => answer.title),
                    rightAnswer: rightAnswerQuestion.title
                }
            })
        }
    }

    submitQuiz = event => {
        event.preventDefault();

        this.props.saveQuiz(this.prepareData());


        //
        // const quiz = {
        //     title: this.state.title
        // };
        //
        // this.props.saveQuiz(quiz);
        // setTimeout(() => {
        //     if (this.props.quizObject.quiz != null) {
        //         this.setState({"show": true, "method": "post"});
        //         setTimeout(() => this.setState({"show": false}), 3000);
        //     } else {
        //         this.setState({"show": false});
        //     }
        // }, 2000);
        // this.setState(this.initialState);
    };

    updateQuiz = event => {
        event.preventDefault();

        const quiz = {
            id: this.state.id,
            title: this.state.title,
        };
        this.props.updateQuiz(quiz);
        setTimeout(() => {
            if (this.props.quizObject.quiz != null) {
                this.setState({"show": true, "method": "put"});
                setTimeout(() => this.setState({"show": false}), 3000);
            } else {
                this.setState({"show": false});
            }
        }, 2000);
        this.setState(this.initialState);
    };


    quizList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {questions} = this.state;

        console.log(questions);

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={this.state.method === "put" ? "Quiz Updated Successfully." : "Quiz Saved Successfully."}
                             type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon
                            icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Quiz" : "Add New Quiz"}
                    </Card.Header>
                    <Form onReset={this.resetQuiz} onSubmit={this.state.id ? this.updateQuiz : this.submitQuiz}
                          id="quizFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Quizz Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="title"
                                                  value={this.state.name}
                                                  onChange={(event => this.setState({name: event.target.value}))}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Quiz Title"/>
                                </Form.Group>
                            </Form.Row>
                            {questions.map(this.renderQuestion)}
                            <Form.Row>
                                <Button size="sm" variant="success" type="button" onClick={this.handleAddQuestion}>
                                    <FontAwesomeIcon icon={faPlusSquare}/> Add Question
                                </Button>{' '}
                            </Form.Row>
                            <Form.Row>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.quizList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Quiz List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }

    createAnswer = () => {
        return {
            id: new Date().getTime() + Math.random(),
            title: '',
        }
    }

    handleAddQuestion = () => {
        const {questions} = this.state;
        const answers = Array(4).fill(0).map(() => this.createAnswer())
        questions.push({
            id: new Date().getTime(),
            title: '',
            correctAnswerId: answers[0].id,
            answers,
        });
        this.setState({questions})
    }

    updateQuestionTitle = (question, title) => {
        question.title = title;
        this.setState({
            questions: [...this.state.questions]
        })
    }

    updateQuestionAnswerTitle = (answer, title) => {
        answer.title = title;
        this.setState({
            questions: [...this.state.questions]
        })
    }

    deleteQuestion = (question) => {
        const questions = this.state.questions.filter(q => q !== question);
        this.setState({questions: [...questions]})
    }

    updateCorrectAnswer = (question, answer) => {
        question.correctAnswerId = answer.id;
        this.setState({
            questions: [...this.state.questions]
        })
    }

    renderQuestion = (question) => {
        const {title, answers} = question;
        return (
            <Form.Row key={question.id}>
                <Form.Group as={Col} controlId="formGridTitle">
                    <Form.Control required autoComplete="off"
                                  type="test" name="title"
                                  value={title}
                                  onChange={(event => this.updateQuestionTitle(question, event.target.value))}
                                  className={"bg-dark text-white"}
                                  placeholder="Enter Quiz Question Title"
                    />

                    <div>
                        {answers.map((answer) => {
                            return (
                                <div style={{paddingLeft: 30}} key={answer.id}>
                                   <div>
                                       <span>Is correct answer?</span>
                                       <input type="checkbox"
                                              checked={answer.id === question.correctAnswerId}
                                              onChange={() => this.updateCorrectAnswer(question, answer)}
                                       />
                                   </div>
                                    <Form.Control required autoComplete="off"
                                                  type="test" name="title"
                                                  value={answer.title}
                                                  onChange={(event => this.updateQuestionAnswerTitle(answer, event.target.value))}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Quiz Question Title"
                                    />
                                </div>
                            )
                        })}
                    </div>



                    <Button type="reset" onClick={() => this.deleteQuestion(question)}>Delete</Button>
                </Form.Group>
            </Form.Row>
        )
    }

};


const mapStateToProps = state => {
    return {
        quizObject: state.quiz
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveQuiz: (quiz) => dispatch(saveQuiz(quiz)),
        fetchQuiz: (quizId) => dispatch(fetchQuiz(quizId)),
        updateQuiz: (quiz) => dispatch(updateQuiz(quiz))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);