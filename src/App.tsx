import './App.css'
import { Board, BoardColumn, Identity, ItemData } from './components/board'
import { CardEvent } from './components/board/Card'
import input from "./data/cards.json"


function App() {
  const data = input as ItemData[]

  const handleColumnClick = (id: Identity) => alert(`column ${id} clicked`)
  const handleCardClick: CardEvent = (id, section, data) => console.log(`item:${id}, section:${section} ${data ? data : ""}`)
  const handleCardMove = (cardId: Identity, _fromId: Identity, toId: Identity) => {
    const idx = data.findIndex(x => x.id === cardId)
    data[idx]!.columnId = toId
  }

  return (
    <div className='flex flex-1 h-[98vh] bg-transparent'>

      <Board data={data} onCardClick={handleCardClick} onCardMove={handleCardMove} >
        <BoardColumn id={1} title='Planned' onClick={handleColumnClick} />
        <BoardColumn id={2} title='Booking' onClick={handleColumnClick} />
        <BoardColumn id={3} title='In Progress' />
        <BoardColumn id={4} title='Ended' />
      </Board>

    </div>
  )
}

export default App
