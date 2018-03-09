import React from 'react';

export default class WelcomeUser extends React.Component {
    constructor() {
        super();
        this.state = { user: [] };
    }

    componentDidMount() {
        fetch(`http://localhost:8081/UserId`)
            .then(result => result.json())
            .then(user => this.setState({ user }))
    }

    render() {
        return (
            <p>
                {this.state.user}
            </p>
        );
    }
}