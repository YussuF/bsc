import React from 'react';
import ReactDOM from 'react-dom';
// Loading Stylesheet
import './index.css';
// Library for Audio
import ReactAudioPlayer from 'react-audio-player';
// Library for Routing
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// Data from Neural Network

let textdata = require('./datamock.json');
let machinedata = require('./machinemock.json');

var current_poem = "0";
var current_confidence = 0;
var current_distribution = [];
var current_class = "";
var current_textdata = [];
var current_lines = [];


function Index() {
	// test for JSON Availability
	tryRequire('./datamock.json') ? console.log("all fine") : alert('JSON not found');
	tryRequire('./machinemock.json') ? console.log("all fine") : alert('JSON not found');
 	console.log("Findpoem:");
 	console.log(findpoem_confidence());
	console.log("-------");
	console.log(Object.keys(machinedata).length);

  return (
  	<p className="hello">Hello World!</p>
  	);
}

// Wrapper for the Classifier
function ClassifierSite() {
  return (
  	<Classifier />
  	);
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


function Categories() {

}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/classifier/">Classifier</Link>
            </li>
            <li>
              <Link to="/categories/">Categories</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/classifier/" component={ClassifierSite} />
        <Route path="/categories/" component={Categories} />
      </div>
    </Router>
  );
}

export default AppRouter;





class Poem extends React.Component {


	render(){
	console.log(current_lines);
		return (
<div className="poem-wrap">
<div className="poem">
	<h3>{ current_poem }</h3>
	<p>

	</p>
</div>
			<ReactAudioPlayer
  src="/sound/53.mp3"
  controls
/>
</div>
			);
	}
}

class Input extends React.Component {
	render(){
		return (
			<div className="corrector">
			<p>Diese Angabe ist</p>
			{/*<input type="radio" className="cor_correct">Korrekt</input>
			<br></br>
			<p>Falsch, bei diesem Gedicht handelt es sich um </p>
			<input type="radio" className="cor_alt1">Variabler Versfuß</input>
			<input type="radio" className="cor_alt1">gehobenes Enjambement</input>
			<input type="radio" className="cor_alt1">unebetontes Enjambement</input>
			<input type="radio" className="cor_alt1">lettristische Dekomposition</input>
			<input type="radio" className="cor_alt1">syntaktische Dekomposition</input>*/}
			<input type="radio" value="option1" checked={true} />Korrekt <br/>
			<p> Falsch, es handelt sich um ein(e/en)</p>
			<input type="radio" value="option1" checked={false} />Variabler Versfuß<br/>
			<input type="radio" value="option1" checked={false} />gehobenes Enjambement<br/>
			<input type="radio" value="option1" checked={false} />unbetontes Enjambement<br/>
			<input type="radio" value="option1" checked={false} />lettristische Dekomposition <br/>
			<input type="radio" value="option1" checked={false} />syntaktische Dekomposition
			<button style={{float:"right", margin:"0 0 200px 0"}}>Nächstes Gedicht</button>
			</div>
			)
	}
}


class Output extends React.Component {
	render() {
	console.log(current_poem);
		return(
			<div className="classifier">
			<p>Dieses Gedicht wurde mit <u>{ current_confidence }% Confidence</u> als <b>{ current_class }</b> klassifiziert. 
			Weitere Konfidenzen </p><br></br>Weitere Konfidenzen :
			<ul>
			<li> <b>82 %</b> Variabler Versfuß</li>
			<li> <b>76 %</b> unebetontes Enjambement</li>
			<li> <b>64 %</b> lettristische Dekomposition</li>
			<li> <b>63 %</b> gehobenes Enjambement</li>

			</ul>
			</div>
			);
	}
}

class Header extends React.Component {
	render() {
		return (
	<div className="header"><p>Classification Correction</p></div>
);
	}
}



class Classifier extends React.Component {
	render() {
	current_poem = findpoem_confidence(); 
		return(
			<div className="site">
			<div className="headerwrap">
			<Header />
			</div>
			<div className="container">
			<div className="left">
			<Output />
			</div>
			<div className="middle">
			<Poem />
			</div>
			<div className="right">
			<Input />
			</div>
			</div>
			</div>
			);
	}
}


// ========================================

ReactDOM.render(
	<AppRouter />,
	document.getElementById('root')
	);
