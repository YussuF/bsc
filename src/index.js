import React from 'react';
import ReactDOM from 'react-dom';
// Loading Stylesheet
import './index.css';
// Library for Routing
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// Data from Neural Network
import Classifier from './Components/classifier.js';
import Home from './Components/home.js';
import Header from './Components/Layout/header.js';
import Categories from './Components/categories.js';
import axios from 'axios';
import Corrected from "./Components/corrected";
axios.defaults.port = 3001;


//Index is the headcomponent of the app, calling all other components. It takes care of routing and loading jsons safely.


let textdata = require('./databaditer.json');
let machinedata = require('./jasper.json');
let categorydata = require('./allcategories.json');
let correctiondata = require('./output2.json');

class App extends React.Component {




	state = {
		textdata : textdata,
		machinedata : machinedata,
		categorydata: categorydata,
		correctiondata : correctiondata,
		name: '',
		greeting: '',
		data: ''
	}


	onPoemSelection(e){

	}

	addCategory(e){

		axios.post(`/api/category/`, { e })
			.then(res => {
				console.log(res);
				console.log(res.data);
			})
	}


	myCallback = (dataFromChild) => {

		console.log(dataFromChild);
	}

	componentDidMount() {
	}

	render() {


	return(

		<Router>
			<div>

				<nav></nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to='/classifier'>Classifier</Link>
					</li>
					<li>
						<Link to="/categories/">Categories</Link>
					</li>
					<li>
						<Link to="/corrected/">Corrected</Link>
					</li>
				</ul>
				<Header />
				<Route path="/" exact component={Home} />
				<Route
					path="/classifier/"
					render={
						(props) => <Classifier {...props}
											   machinedata={this.state.machinedata}
											   categorydata={this.state.categorydata}
											   textdata={this.state.textdata}
											   greeting={this.state.greeting}
											   correctiondata={this.state.correctiondata}
						/>
					}
				/>
				<Route
					path="/categories/"
					render={
						(props) => <Categories {...props}
											   machinedata={this.state.machinedata}
											   categorydata={this.state.categorydata}
											   textdata={this.state.textdata}
											   greeting={this.state.greeting}
											   correctiondata={this.state.correctiondata}
											   callbackfromParent={this.myCallback}
											   onPoemSelection={this.onPoemSelection}
											   onCategoryAdd={this.addCategory}
						/>
					}
				/>
				<Route
					path="/corrected/"
					render={
						(props) => <Corrected {...props}
											   machinedata={this.state.machinedata}
											   categorydata={this.state.categorydata}
											   textdata={this.state.textdata}
											   greeting={this.state.greeting}
											   correctiondata={this.state.correctiondata}
						/>
					}
				/>
			</div>
		</Router>
	);
}


}

export default App;

// ========================================

ReactDOM.render(
	<App />,
	document.getElementById('root')
	);
