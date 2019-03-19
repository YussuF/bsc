import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactAudioPlayer from 'react-audio-player';

function Square(props){
	return (
		<button className="square" onClick={props.onClick}>
		{props.value}
		</button>
		);
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
  src="53.mp3"
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

class Home extends React.Component {
	render() {
		return(
			<button className="start" onClick={() => <Classifier />}>LALALA
			</button>
			)
	}
}


// ========================================

ReactDOM.render(
	<Home />,
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