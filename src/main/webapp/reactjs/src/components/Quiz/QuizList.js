import React, {Component} from 'react';

import {connect} from 'react-redux';
import {deleteQuiz} from '../../services/index';

import './../../assets/css/Style.css';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl, Nav} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faList,
    faEdit,
    faTrash,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faPlay
} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

class QuizList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizs: [],
            search: '',
            currentPage: 1,
            quizPerPage: 5,
            sortDir: "asc"
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllQuizs(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllQuizs(this.state.currentPage);
    }

    findAllQuizs(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/tests?pageNumber=" + currentPage + "&pageSize=" + this.state.quizPerPage + "&sortBy=price&sortDir=" + this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    quizs: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            })
            .catch(error => {
                console.log(error);
                localStorage.removeItem('jwtToken');
                this.props.history.push('/');
            });
    };

    deleteQuiz = (quizId) => {
        this.props.deleteQuiz(quizId);
        setTimeout(() => {
            if (this.props.quizObject != null) {
                this.setState({"show": true});
                setTimeout(() => this.setState({"show": false}), 3000);
                this.findAllQuizs(this.state.currentPage);
            } else {
                this.setState({"show": false});
            }
        }, 2000);
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllQuizs(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            if (this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllQuizs(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            if (this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllQuizs(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.quizPerPage);
        if (this.state.currentPage < condition) {
            if (this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllQuizs(condition);
            }
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.quizPerPage)) {
            if (this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllQuizs(this.state.currentPage + 1);
            }
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    // cancelSearch = () => {
    //     this.setState({"search": ''});
    //     this.findAllQuizs(this.state.currentPage);
    // };
    //
    // searchData = (currentPage) => {
    //     currentPage -= 1;
    //     axios.get("http://localhost:8080/rest/quizs/search/" + this.state.search + "?page=" + currentPage + "&size=" + this.state.quizPerPage)
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({
    //                 quizs: data.content,
    //                 totalPages: data.totalPages,
    //                 totalElements: data.totalElements,
    //                 currentPage: data.number + 1
    //             });
    //         });
    // };



    render() {
        const {quizs, currentPage, totalPages, search} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Quiz Deleted Successfully."} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div>
                            <FontAwesomeIcon icon={faList}/> Quiz List
                        </div>
                        {/*<div style={{"float": "left"}}>*/}
                        {/*    <InputGroup size="sm">*/}
                        {/*        <FormControl placeholder="Search" name="search" value={search}*/}
                        {/*                     className={"info-border bg-dark text-white"}*/}
                        {/*                     onChange={this.searchChange}/>*/}
                        {/*        <InputGroup.Append>*/}
                        {/*            <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>*/}
                        {/*                <FontAwesomeIcon icon={faSearch}/>*/}
                        {/*            </Button>*/}
                        {/*            <Button size="sm" variant="outline-danger" type="button"*/}
                        {/*                    onClick={this.cancelSearch}>*/}
                        {/*                <FontAwesomeIcon icon={faTimes}/>*/}
                        {/*            </Button>*/}
                        {/*        </InputGroup.Append>*/}
                        {/*    </InputGroup>*/}
                        {/*</div>*/}
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Last Change</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                quizs.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">No Quiz Available.</td>
                                    </tr> :
                                    quizs.map((quiz) => (
                                        <tr key={quiz.id}>
                                            <td>{quiz.name}</td>
                                            <td>{quiz.creator}</td>
                                            <td>{quiz.lastChange}</td>
                                            <td>
                                                {this.props.auth.isAdmin? <>
                                                    <ButtonGroup>
                                                        <Link to={"edit/" + quiz.id}
                                                              className="btn btn-sm btn-outline-primary"><FontAwesomeIcon
                                                            icon={faEdit}/></Link>{' '}
                                                        <Button size="sm" variant="outline-danger"
                                                                onClick={this.deleteQuiz.bind(this, quiz.id)}><FontAwesomeIcon
                                                            icon={faTrash}/></Button>
                                                    </ButtonGroup>
                                                </>
                                                    :
                                                    <>
                                                    <ButtonGroup>
                                                        <Link to={"pass/" + quiz.id}
                                                              className="btn btn-sm btn-outline-primary"><FontAwesomeIcon
                                                            icon={faPlay}/></Link>{' '}
                                                    </ButtonGroup>
                                                </>}
                                            </td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                    {quizs.length > 0 ?
                        <Card.Footer>
                            <div style={{"float": "left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float": "right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward}/> First
                                        </Button>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward}/> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
                                                 onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward}/> Next
                                        </Button>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward}/> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                    }
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quizObject: state.quiz,
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteQuiz: (quizId) => dispatch(deleteQuiz(quizId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);