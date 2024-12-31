import { Children } from 'react'
import { useState } from 'react'
import { Square } from './components/Square'
import './App.css'
import { TURNS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { Winner } from './components/Winner.jsx'






function App() {

  const [board, setBoard] = useState(() => {
    const savedBoard = window.localStorage.getItem('board')
    return savedBoard ? JSON.parse(savedBoard) : (Array(9).fill(null))
  })
    

  const [turn, setTurn] = useState(() => {
    const savedTurn = window.localStorage.getItem('turn')
    return savedTurn ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }



  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return(
  <main className='board'>
    <h1>TA - TE - TI</h1>
    <section className='game'>
    {
      board.map((square, index) => {
        return (
          <Square 
          key={index} 
          index={index}
          updateBoard={updateBoard}
          >
            {board[index]}
          </Square>
        )
      })
    }
    </section>
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
      <Winner resetGame={resetGame} winner={winner} />
    </main>
    )
    
}

export default App
