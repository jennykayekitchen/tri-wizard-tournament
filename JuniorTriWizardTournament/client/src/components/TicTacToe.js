import React from 'react';
import "./TicTacToe.css"

export const TicTacToe = () => {
    const handleClick = () => {

    }

    const Cell = () => {
        return <td onClick={() => handleClick()}></td>
    }
    
    return (
        <div className="tictactoe-container">
            <h1 className='tictactoe-title'>Tic Tac Toe</h1>
            <div className='tictactoe-board'>
                <table>
                    <body>
                        <tr>
                            <Cell />
                            <Cell />
                            <Cell />
                        </tr>
                        <tr>
                            <Cell />
                            <Cell />
                            <Cell />
                        </tr>
                        <tr>
                            <Cell />
                            <Cell />
                            <Cell />
                        </tr>
                    </body>
                </table>
            </div>
        </div>
    );
}

