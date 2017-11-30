import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      turn: 'x',
      turnCounter: 0,
      victory: false,
      squares: [['', '', ''], ['', '', ''], ['', '', '']]
    };
  }

  reset() {
    this.setState({
      turn: 'x',
      turnCounter: 0,
      victory: false,
      squares: [['', '', ''], ['', '', ''], ['', '', '']]
    });
  }

  registerClick(row, column) {
    if (this.state.squares[row][column] === '' && !this.state.victory) {
      let squares = JSON.parse(JSON.stringify(this.state.squares));
      squares[row][column] = this.state.turn;
      let victory = this.checkForWin(squares);
      if (victory) {
        this.setState({ squares, victory });
      } else {
        this.setState({
          squares,
          turnCounter: this.state.turnCounter + 1,
          turn: this.state.turn === 'x' ? 'o' : 'x'
        });
      }
    }
  }

  checkForWin(squares) {
    if (this.state.turnCounter < 4) return false;
    let found = false;
    //check each row for a match
    squares.forEach((row) => {
      if (row[0] !== '' && row[0] === row[1] && row[0] === row[2]) {
        found = true;
      }
    });
    if (found) return true;
    // check each column for a match
    squares[0].forEach((value, index) => {
      if (value !== '' 
        && squares[1][index] === value 
        && squares[2][index] === value
      ) {
        found = true;
      }
    });
    if (found) return true;
    // check diagonals
    if (squares[1][1] !== '') {
      if (squares[0][0] === squares[1][1] 
        && squares[2][2] === squares[1][1]
      ) {
        return true;
      }
      if (squares[2][0] === squares[1][1] 
        && squares[0][2] === squares[1][1]
      ) {
        return true;
      }
    }
    return false;
  }
  render() {
    let squares = this.state.squares.map((row, rindex) => {
      let buttons = row.map((square, cindex) => {
        return (<Button
          onClick={() => this.registerClick(rindex, cindex)}
          style={{
            height: 75,
            width: 75,
            margin: 5,
            verticalAlign: 'bottom',
            fontSize: 35
          }}
          id={'r' + rindex + 'c' + cindex}
          disabled={square !== '' || this.state.victory}
        >{square}</Button>);
      });
      return (<div>{buttons}</div>);
    });
    let message = this.state.victory 
      ? this.state.turn + ' has won!'
      : 'It is ' + this.state.turn + '\'s turn.'
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Play Tic-Tac-Toe</h1>
        </header>
        <div>{squares}</div>
        <p className="App-intro">
          {message}
        </p>
        <Button bsStyle="primary" onClick={() => this.reset()}>Start new game</Button>
      </div>
    );
  }
}

export default App;
