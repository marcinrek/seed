import React from 'react';
import { reversString } from 'helpers.mod';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name
        }
    }

    update(e) {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.txt}</h1>
                <ul>
                    <li><input
                        placeholder="Type your name"
                        defaultValue={this.props.name}
                        onChange={this.update.bind(this)}
                        onFocus={e => e.target.value = ''}
                    />
                    </li>
                    <li>Reversed: {reversString(this.state.name)}</li>
                </ul>
            </div>
        )
    }
}

export default Home
