import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {logoutUser, authenticateUser} from '../services/index';

class NavigationBar extends Component {
    componentDidMount = () => {
        const { isLoggedIn } = this.props.auth;
        if(!isLoggedIn) {
           const email = localStorage.getItem("email");
           const password = localStorage.getItem("password");
           if(email && password) {
               const {authenticateUser} = this.props;
               authenticateUser(email, password);
           }
        }
    }

    logout = () => {
        this.props.logoutUser();
    };

    render() {
        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <Nav className="navbar-right">
                    <Link to="/register" className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
                    <Link to="/login" className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
                </Nav>
            </>
        );

        const userLinks = (
            <>
                <Nav className="mr-auto">
                    <Link to={"/tests"} className="nav-link">Testing</Link>
                    <Link to={"/results"} className="nav-link">Results</Link>
                </Nav>
                <Nav className="navbar-right">
                    <Link to={"/logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                </Nav>
            </>
        );


        const adminLinks = (
            <>
                <Nav className="mr-auto">
                    <Link to={"add"} className="nav-link">Add Test</Link>
                    <Link to={"tests"} className="nav-link">Tests</Link>
                </Nav>
                <Nav className="navbar-right">
                    <Link to={"logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                </Nav>
            </>
        );

        let linksToDisplay = guestLinks;
        const { isLoggedIn, isAdmin } = this.props.auth;
        if(isLoggedIn) {
            linksToDisplay = isAdmin? adminLinks: userLinks;
        }

        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="data:image/jpeg;base64,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" width="25" height="25" alt="brand"/>Quiz App
                </Link>
                {linksToDisplay}
            </Navbar>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);