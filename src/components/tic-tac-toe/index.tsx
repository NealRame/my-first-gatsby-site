import * as React from "react"

import type {
    IBoardSquareData,
    IBoardState,
    IBoardSquareValue,
} from "./types"

import {
    game,
    grid,
    square,
} from "./tic-tac-toe.module.css"

function Square({ value, onClick }: IBoardSquareData) {
    return (
        <button className={ square } onClick={ onClick }>
            { value ?? " " }
        </button>
    )
}

function Board() {
    const [ turn, setTurn ] = React.useState<IBoardSquareValue>("X")
    const [ squares, setSquares ] = React.useState<IBoardState>([
        null, null, null,
        null, null, null,
        null, null, null,
    ])
    
    const hasWinner = (squares: IBoardState) => {
        const lines = [
            [ 0, 1, 2 ],
            [ 3, 4, 5 ],
            [ 6, 7, 8 ],
            [ 0, 3, 6 ],
            [ 1, 4, 7 ],
            [ 2, 5, 8 ],
            [ 0, 4, 8 ],
            [ 2, 4, 6 ],
        ]
        return lines.some(([a, b, c]) => {
            return squares[a] != null
                && squares[a] === squares[b]
                && squares[a] === squares[c]
        })
    }

    const drawn = (squares: IBoardState) => {
        return squares.every(square => square != null)
    }

    const clickHandler = (index: number) => () => {
        if (!(hasWinner(squares) || drawn(squares))
                && squares[index] === null) {
            const newSquares = [...squares] as IBoardState
            newSquares[index] = turn
            setSquares(newSquares)
            if (!hasWinner(newSquares)) {
                setTurn(turn === "X" ? "O" : "X")
            }
        }
    }

    return (
        <div>
            <div>
                {
                    hasWinner(squares)
                        ? `${turn} wins!`
                        : drawn(squares)
                            ? "Draw!"
                            : `Next player: ${turn}`
                }
            </div>
            <div className={ grid }>
                { squares.map((value, index) => (
                        <Square key={ index } value={ value } onClick={ clickHandler(index) } />
                    ))
                }
            </div>
        </div>
    )
}

function Game() {
    return (
        <div className={ game }>
            <Board/>
        </div>
    )
}

export default Game