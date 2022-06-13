import React, {Component} from 'react';
import "./App.css";
import AppNavbar from './AppNavbar';
import {Link} from "react-router-dom";
import {Button, Container} from "reactstrap";

export default class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <Button color="link">
                        <Link to="/api/v1/queries"
                            onClick={() => {window.location.href="/api/v1/queries"}}
                        >Check out what everyone is up to!</Link>
                    </Button>
                </Container>
            </div>
        );
    }
}