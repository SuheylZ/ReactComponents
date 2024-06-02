import './App.css'
import { Board, BoardColumn, ItemData } from './components/board'
import { States } from './components/board/Column'
import input from "./data/cards.json"


function App() {
  const data = input as ItemData[]

  return (
    <div className='flex flex-1 h-[90vh] bg-transparent'>
      <Board data={data}
        onCardClick={(id, section, data) => console.log(`item:${id}, section:${section} ${data ? data : ""}`)}
        onCardMove={(id, _, tid) => {
          const idx = data.findIndex(x => x.id === id)
          data[idx]!.columnId = tid
        }}>
        <BoardColumn id={1} title='Planned' state={States.Blue} onClick={() => alert(`Planning chosen`)} />
        <BoardColumn id={2} title='Booking' state={States.Yellow} onClick={() => alert(`Booking chosen`)} />
        <BoardColumn id={3} title='In Progress' state={States.Green} />
        <BoardColumn id={4} title='Ended' state={States.Orange} />
      </Board>
    </div>
  )
}

export default App
