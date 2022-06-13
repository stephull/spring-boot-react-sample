import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from "./AppNavbar";
import {Link} from 'react-router-dom';

export default class QueryList extends Component {
    constructor(props) {
        super(props);
        this.state = {queries: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch("/api/v1/queries")
            .then((res) => res.json())
            .then((data) => this.setState({queries: data}))
    }

    async remove(id) {
        await fetch(`/api/v1/queries/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.queries].filter((i) => i.id !== id);
            this.setState({queries: updatedClients});
        })
    }

    render() {
        const {queries} = this.state;
        const queryList = queries.map((query) => {
            return (
                <tr key={query.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{query.name}</td>
                    <td>{query.query}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="primary" tag={Link} to={`/api/v1/queries/${query.id}`}>Edit</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(query.id)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} 
                            to="/api/v1/queries/new" onClick={() => {window.location.href="/api/v1/queries/new"}}
                        >Add Query</Button>
                    </div>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th style={{userSelect: "none"}} width="20%">Name</th>
                                <th style={{userSelect: "none"}} width="60%">Query</th>
                                <th style={{userSelect: "none"}} width="20%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queryList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}