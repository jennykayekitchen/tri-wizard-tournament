import React, { useState } from 'react';
import "./TicTacToe.css"

export const TicTacToe = () => {
    const [turn, setTurn] = useState('x')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState()

    const checkForWinner = (squares) => {
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }        

        for (let combo in combos) {
            combos[combo].forEach((pattern) => {
                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === '' 
                ) {
                } else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]])
                }
            })
        }
    }

    const handleRestart = () => {
        setWinner(null)
        setCells(Array(9).fill(''))
    }

    const handleClick = (num) => {
        if (cells[num]) {
            alert('already clicked')
            return
        }

        let squares = [...cells]

        if (turn === 'x') {
            squares[num] = 'x';
            setTurn('o');
            setTimeout(function() {
              var emptySquares = squares.filter(square => square !== 'x' && square !== 'o');
              if (emptySquares.length > 0) {
                var randomIndex = Math.floor(Math.random() * emptySquares.length);
                var randomSquare = emptySquares[randomIndex];
                var index = squares.indexOf(randomSquare);
                squares[index] = 'o';
                // Update the state or display logic to reflect the change
              }
              setTurn('x');
            }, 700);          
        }                  
                
        checkForWinner(squares)
        setCells(squares)        
    }

    const Cell = ({ num }) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
    }
    
    return (
        <div className="tictactoe-container">
            <h1 className='tictactoe-title'>Tic Tac Toe</h1>
            <div className='tictactoe-board'>
                <table>
                    Turn: {turn}
                    <body>
                        <tr>
                            <Cell num={0} />
                            <Cell num={1} />
                            <Cell num={2} />
                        </tr>
                        <tr>
                            <Cell num={3} />
                            <Cell num={4} />
                            <Cell num={5} />
                        </tr>
                        <tr>
                            <Cell num={6} />
                            <Cell num={7} />
                            <Cell num={8} />
                        </tr>
                    </body>
                </table>
            </div>
            <div className="tictactoe-winner">
                {winner && (
                    <>
                        <p>{winner} is the winner!</p>
                        <button onClick={() => handleRestart()}>Play Again</button>
                    </>
                )}
            </div>
        </div>
    );
}

