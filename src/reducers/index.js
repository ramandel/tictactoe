let checkForWin = function(squares, turnCounter, row, column) {
    if (turnCounter < 4) return false; // there needs to be at least 4 turns prior to this one for a win condition to be possible
    let found = false;
    //check the row of the latest click for a match
    if (
        squares[row][0] === squares[row][1] 
        && squares[row][0] === squares[row][2]
    ) return true;
    // check the row of the latest click for a match
    if (
        squares[0][column] === squares[1][column] 
        && squares[0][column] === squares[2][column]
    ) return true;
    // check the 'forward-slash' diagonal if needed
    if (row + column === 2) {
        if (squares[2][0] === squares[1][1] 
        && squares[0][2] === squares[1][1]
        ) {
            return true;
        }
    }
    // check the 'back-slash' diagonal if needed
    if (row === column) {
        if (squares[0][0] === squares[1][1] 
            && squares[2][2] === squares[1][1]
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
            let victory = checkForWin(squares, state.turnCounter, action.row, action.column);
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