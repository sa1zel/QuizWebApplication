import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz/Quiz';
import QuizList from './components/Quiz/QuizList';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Footer from './components/Footer';
import ResultList from "./components/Quiz/ResultList";

export default function App() {

    window.onbeforeunload = (event) => {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
            e.returnValue = '';
        }
        return '';
    };

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
                        <Route path="/tests" exact component={QuizList}/>
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
