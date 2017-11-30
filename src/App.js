import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    let squares = this.props.squares.map((row, rindex) => {
      let buttons = row.map((square, cindex) => {
        return (<Button
          onClick={() => this.props.registerClick(rindex, cindex)}
          style={{
            height: 75,
            width: 75,
            margin: 5,
            verticalAlign: 'bottom',
            fontSize: 35
          }}
          id={'r' + rindex + 'c' + cindex}
          disabled={square !== '' || this.props.victory}
        >{square}</Button>);
      });
      return (<div>{buttons}</div>);
    });
    let message = this.props.victory 
      ? this.props.turn + ' has won!'
      : 'It is ' + this.props.turn + '\'s turn.'
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Play Tic-Tac-Toe</h1>
        </header>
        <div>{squares}</div>
        <p className="App-intro">
          {message}
        </p>
        <Button bsStyle="primary" onClick={() => this.props.onReset()}>Start new game</Button>
      </div>
    );
  }
}

App.propTypes = {
  victory: PropTypes.bool,
  squares: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  turn: PropTypes.string,
  onReset: PropTypes.func.isRequired,
  registerClick: PropTypes.func.isRequired
}

export default App;
