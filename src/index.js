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

{/*
	Index is the headcomponent of the app, calling all other components. It takes care of routing and loading jsons safely.
*/}




let textdata = require('./datamock.json');
let machinedata = require('./machinemock.json');
let categorydata = require('./categorymock.json');

var current_poem = "0";
var current_confidence = 0;
var current_distribution = [];
var current_class = "";
var current_textdata = [];
var current_lines = [];


class App extends React.Component {




	state = {
		textdata : textdata,
		machinedata : machinedata,
		categorydata: categorydata
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
						/>
					}
				/>
				<Route path="/categories/" component={Categories} />
			</div>
		</Router>
	);
}


}


function Index() {
	// test for JSON Availability
	tryRequire('./datamock.json') ? console.log("all fine") : alert('JSON not found');
	tryRequire('./machinemock.json') ? console.log("all fine") : alert('JSON not found');
 	//console.log("Findpoem:");
 	//console.log(findpoem_confidence());
	//console.log("-------");
	//console.log(Object.keys(machinedata).length);

  return (
  	<p className="hello">Hello World!</p>
  	);
}

function loadingjson(){
	//console.log(this.state);
}


// Helper function for Availability testing
const tryRequire = (path) => {
  try {
   return require(`${path}`);
  } catch (err) {
   return null;
  }
};

// Finding Poems by c
function findpoem_confidence(){
	var tmp = 0;
	var res = 0;
	var tmp_i = 0;
	for (var i = Object.keys(machinedata).length - 1; i >= 0; i--) {
		if (machinedata[i]["Confidence"] > tmp) {
			tmp = machinedata[i]["Confidence"];
			res = machinedata[i]["id"];
			tmp_i = i;
		}
	}
	current_confidence = machinedata[tmp_i]["Confidence"];
	current_distribution = machinedata[tmp_i]["distribution"];
	current_class = machinedata[tmp_i]["class"];
	current_textdata = textdata[res];
	current_lines = current_textdata["lines"];
	console.log(current_lines[0]["line"]);
	return (tmp, res);
}




export default App;

// ========================================

ReactDOM.render(
	<App />,
	document.getElementById('root')
	);
