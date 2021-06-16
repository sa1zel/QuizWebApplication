import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz/Quiz';
import PassQuiz from './components/Quiz/PassQuiz';
import QuizList from './components/Quiz/QuizList';
import QuizResults from './components/Quiz/QuizResults';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Footer from './components/Footer';
import ResultList from "./components/Quiz/ResultList";
import { authenticateUser } from "./services/user/auth/authActions";

export default function App() {

  const heading = "Welcome to Testing Service";
  const quote = "Testing leads to failure, and failure leads to understanding.";
  const footer = "Burt Rutan";

  return (
    <Router>
        <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} className={"margin-top"}>
                    <Switch>
                        <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                        <Route path="/confirm" exact component={() => <Welcome heading="Successful registration" quote="To finish
                        registration, confirm your email." footer="Administration"/>}/>
                        <Route path="/add" exact component={Quiz}/>
                        <Route path="/edit/:id" exact component={Quiz}/>
                        <Route path="/pass/:id" exact component={PassQuiz}/>
                        <Route path="/tests" exact component={QuizList}/>
                        <Route path="/user/result" exact component={QuizResults}/>
                        <Route path="/results" exact component={ResultList}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/logout" exact component={Login}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
    </Router>
  );
}
