import React from 'react';
import { render } from 'react-dom';


class Sort extends React.Component {

    constructor() {
        super();
        this.state = {
            arrayList: ['Title', 'Vote'],
            open: null
        };
    }

    openList = () => {
        return (
            <ul style={{ listStyle: 'none', border: '1px solid #000' }}>
                <li>Title </li>
                <li>Vote</li>
            </ul>
        );
    }

    openDropDown = (event) => {
        console.log(event.target.innerText);
        this.setState({
            open: event.target.innerText,
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.arrayList.map((sortBy, index) => {
                        return (<div key={`${sortBy}-${index}`}>
                            <span onClick={this.openDropDown}>
                                {sortBy}
                            </span>
                            {sortBy === this.state.open ? this.openList() : null}
                        </div>);
                    })
                }
            </div>
        );
    }
}
render(<Sort />, document.getElementById('sortBy'));