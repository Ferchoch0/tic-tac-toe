import { Square } from './Square.jsx'

export function Winner({ winner, resetGame }) {
    

    if(winner === null) return null

    const winnerText =  winner === false ? 'It\'s a draw!' : `Player win!`
    
    return(
        <section className="winner">
          <div className={`text ${winner ? 'winner-animate' : ''}`}>
 
            <h2> {winnerText} </h2>
            
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Play Again</button>
            </footer>

          </div>
        </section>

      )
    }