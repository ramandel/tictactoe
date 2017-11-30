let checkForWin = function(squares, turnCounter) {
    if (turnCounter < 4) return false;
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
export default (state, action) => {
    switch (action.type) {
      case 'RESET':
        return {
            turn: 'x',
            turnCounter: 0,
            victory: false,
            squares: [['', '', ''], ['', '', ''], ['', '', '']]
        };
      case 'CLICK':
        if (state.squares[action.row][action.column] === '' && !state.victory) {
            let squares = JSON.parse(JSON.stringify(state.squares));
            squares[action.row][action.column] = state.turn;
            let victory = checkForWin(squares);
            if (victory) {
                return {
                    squares,
                    victory,
                    turn: state.turn,
                    turnCounter: state.turnCounter
                };
            } else {
                return {
                    squares,
                    turnCounter: state.turnCounter + 1,
                    turn: state.turn === 'x' ? 'o' : 'x',
                    victory
                };
            }
        }
        return state
      default:
        return state
    }
  }