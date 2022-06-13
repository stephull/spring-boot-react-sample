import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from "./AppNavbar";

class QueryEdit extends Component {
    emptyItem = {
        name: '',
        query: '',
        published: false
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== "new") {
            const temp = await fetch(`queries/${this.props.match.params.id}`)
            const query = await temp.json();
            this.setState({item: query});
        }
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {item} = this.state;
        await fetch(`/api/v1/queries/${item.id ? `/${item.id}` : ''}`, {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/api/v1/queries');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Query' : 'Add Query'}</h2>

        return (
            <div>
                <AppNavbar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <br/>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={item.name || ''}
                                onChange={this.handleChange} autoComplete="name" />
                        </FormGroup>
                        <br/>
                        <FormGroup>
                            <Label for="query">Query</Label>
                            <Input type="text" name="query" id="query" value={item.query || ''}
                                onChange={this.handleChange} autoComplete="query" />
                        </FormGroup>
                        <br/>
                        <FormGroup>
                            <Button color='primary' type="submit" to="/"
                                onClick={() => {window.location.href="/"}}
                            >Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/api/v1/queries"
                                onClick={() => {window.location.href="/api/v1/queries"}}
                            >Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(QueryEdit);