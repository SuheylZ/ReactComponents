import './App.css'
import { Board, BoardCard, BoardColumn } from './components/board'
import { States } from './components/board/Column'

function App() {
  return (
    <>
      <Board>
        <BoardColumn id={1} title='Planned' state={States.Blue}>
        </BoardColumn>
        <BoardColumn id={2} title='Booking' state={States.Yellow}>
        </BoardColumn>
        <BoardColumn id={3} title='In Progress' state={States.Green}>
        </BoardColumn>
        <BoardColumn id={4} title='Ended' state={States.Orange}>
        </BoardColumn>
      </Board>

      <br />

      <BoardCard
        id={1}
        title='My Card Title'
        position={1}
        detail='this is the detail'
        onDoubleClick={() => alert("Card Selected")}
      />
    </>

  )
}

export default App
