import React, {Component} from 'react';
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faUndo, faUserPlus, faUser, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {registerUser} from "../../services";
import MyToast from "../MyToast";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.registered = false;
    }

    initialState = {
        firstName: '', lastName: '', email: '', password: ''
    };

    userChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    regUser = () => {
        this.props.registerUser(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
        setTimeout(() => {
            if (this.props.registered) {
                return this.props.history.push("/confirm")
            } else {
                this.resetRegisterForm();
            }
        }, 1000);
    };

    render() {
        const {firstName, lastName, email, password} = this.state;

        return (
            <div>
                <Row className="justify-content-md-center">
                    <Col xs={5}>
                        <Card className={"border border-dark bg-dark text-white"}>
                            <Card.Header>
                                <FontAwesomeIcon icon={faUserPlus}/> Register
                            </Card.Header>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl autoComplete="off" type="text" name="firstName"
                                                         value={firstName}
                                                         onChange={this.userChange}
                                                         className={"bg-dark text-white"}
                                                         placeholder="Enter First Name"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faUserAlt}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl required autoComplete="off" type="text" name="lastName"
                                                         value={lastName} onChange={this.userChange}
                                                         className={"bg-dark text-white"}
                                                         placeholder="Enter Last Name"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl required autoComplete="off" type="text" name="email"
                                                         value={email}
                                                         onChange={this.userChange}
                                                         className={"bg-dark text-white"} placeholder="Enter email"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl autoComplete="off" type="password" name="password"
                                                         value={password}
                                                         onChange={this.userChange}
                                                         className={"bg-dark text-white"} placeholder="Enter Password"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer style={{"text-align": "right"}}>
                                <Button size="sm" type="button" variant="success"
                                        disabled={this.state.email.length === 0 || this.state.password.length === 0}
                                        onClick={this.regUser}>
                                    <FontAwesomeIcon icon={faUserPlus}/> Register
                                </Button>{' '}
                                <Button size="sm" type="button" variant="info" onClick={this.resetRegisterForm}>
                                    <FontAwesomeIcon icon={faUndo}/> Reset
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        registered: state.registered
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (firstName, lastName, email, password) => dispatch(registerUser(firstName, lastName, email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);