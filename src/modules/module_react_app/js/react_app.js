import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import Home from 'react_app_home';
import Details from 'react_app_details';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="container">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/details/lvl2">About</Link>
						</li>
					</ul>

					<Route exact path="/" render={(props) => (<Home txt={"Amazing name revers app ver. 2.7.7:"} name={"John Doe"} />)} />
					<Route path="/details/lvl2" component={Details} />
				</div>
			</Router>
		);
	}
}

export default App;

