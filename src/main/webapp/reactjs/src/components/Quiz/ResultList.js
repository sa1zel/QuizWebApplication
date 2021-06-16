import React, {Component} from 'react';

import './../../assets/css/Style.css';
import {Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

class ResultList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results : []
        };
    }

    componentDidMount() {
        this.findAllResults();
    }

    findAllResults() {
        axios.post("http://localhost:8080/api/tests/results")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    results: data
                });
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
    };

    render() {
        const {results} = this.state;

        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Result List
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Result</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                results.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">No Result Available.</td>
                                    </tr> :
                                    results.map((result) => (
                                        <tr key={result.id}>
                                            <td>{result.testTitle}</td>
                                            <td>{result.sum}</td>
                                            <td>{result.passedAt}</td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                    {results.length > 0 ?
                        <Card.Footer>
                        </Card.Footer> : null
                    }
                </Card>
            </div>
        );
    }
}

export default ResultList;