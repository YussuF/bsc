import React from 'react';
import ReactDOM from 'react-dom';
// Loading Stylesheet
import './index.css';
// Library for Audio
import ReactAudioPlayer from 'react-audio-player';
// Library for Routing
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// Data from Neural Network
import myData from './data3.json';

function Index() {
	// test for JSON Availability
	tryRequire('./data.json') ? console.log(myData) : alert('JSON not found');

 	console.log(findpoem_confidence());
  	for (var i = myData.length - 1; i >= 0; i--) {
  	//console.log(myData[i].id);
  	}

  return (
  	<p className="hello">Hello World!</p>
  	);
}

// Wrapper for the Clssifier
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
	console.log(myData.length - 1);
	for (var i = myData.length - 1; i >= 0; i--) {
		var tmp = 0;
		var id = null;
		if (myData[i].confidence > tmp) {
			tmp = myData[i].confidence;
			id = myData[i].id;
		}
	}
	return id;
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
              <Link to="/about/">Classifier</Link>
            </li>
            <li>
              <Link to="/categories/">Categories</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={ClassifierSite} />
        <Route path="/categories/" component={Categories} />
      </div>
    </Router>
  );
}

export default AppRouter;


function Square(props){
	return (
		<button className="square" onClick={props.onClick}>
		{props.value}
		</button>
		);
}

class InputText extends React.Component {

  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue() {
    console.log('Placeholder to prevent bug');
  }

  render() {

   // Use destructuring to grab the individual properties from params
   const { type, name, classname, placeholder } = this.props.params;

    // Use those properties in the returned component elements
    return (
      <div className={classname}>
        <label htmlFor={name}>Test</label>
        <input
          onChange={this.changeValue}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </div>
    );
  }
}


class Board extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	handleClick(i){
		const squares = this.state.squares.slice();
		if (calculateWinner(squares) || squares[i] ) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			squares:squares,
			xIsNext: !this.state.xIsNext,
		});
	}

	renderSquare(i) {
		return (
			<Square 
			value={this.state.squares[i]}
			onClick={() => this.handleClick(i)}
			/>
			);
	}

	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if(winner) {
			status = 'Winner: ' + winner;
		} else{
			status= 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div>
			<div className="status">{status}</div>
			<div className="board-row">
			{this.renderSquare(0)}
			{this.renderSquare(1)}
			{this.renderSquare(2)}
			</div>
			<div className="board-row">
			{this.renderSquare(3)}
			{this.renderSquare(4)}
			{this.renderSquare(5)}
			</div>
			<div className="board-row">
			{this.renderSquare(6)}
			{this.renderSquare(7)}
			{this.renderSquare(8)}
			</div>
			</div>
			);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
			<div className="game-board">
			<Board />
			</div>
			<div className="game-info">
	</div>
	</div>
	);
	}
}

class Poem extends React.Component {
	render(){
		return (
<div className="poem-wrap">
<div className="poem">
	<h3>1886</h3>
	<p>Ostern am spätesten Termin,
an der Elbe blühte schon der Flieder,
dafür Anfang Dezember ein so unerhörter Schneefall,
dass der gesamte Bahnverkehr
in Nord- und Mitteldeutschland
für Wochen zum Erliegen kam.

Paul Heyse veröffentlicht eine einaktige Tragödie,
Es ist Hochzeitsabend, die junge Frau entdeckt,
dass ihr Mann einmal ihre Mutter geliebt hat,
alle längst tot, immerhin
von ihrer Tante, die Mutterstelle vertrat,
hat sie ein Morphiumfläschchen:
»störe das sanfte Mittel nicht«,
sie sinkt zurück, hascht nach seiner Hand,
Theodor (düster, aufschreiend):
»Lydia! Mein Weib! Nimm mich mit Dir«! –
Titel: »Zwischen Lipp’ und Kelchesrand.«
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
			<button className="cor_correct">Korrekt</button>
			<br></br>
			<p>Falsch, bei diesem Gedicht handelt es sich um </p>
			<button className="cor_alt1">Variabler Versfuß</button>
			<button className="cor_alt1">gehobenes Enjambement</button>
			<button className="cor_alt1">unebetontes Enjambement</button>
			<button className="cor_alt1">lettristische Dekomposition</button>
			<button className="cor_alt1">syntaktische Dekomposition</button>
			</div>
			)
	}
}


class Output extends React.Component {
	render() {
		return(
			<div className="classifier">
			<p>Dieses Gedicht wurde mit <u>95% Confidence</u> als <b>Parlando</b> klassifiziert. 
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


function calculateWinner(squares) {
	const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}