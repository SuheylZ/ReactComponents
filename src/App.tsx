import './App.css'
import { Board, BoardCard, BoardColumn, IBoardData } from './components/board'
import { States } from './components/board/Column'

function App() {

  const boardData: IBoardData = {
    items: [
      {
        id: 0,
        title: "My Card Title",
        detail: "this is the detail",
        position: 0,
        columnId: 1
      },
      {
        id: 1,
        title: "My Second Card",
        detail: "There is something about xplorie",
        position: 1,
        columnId: 3
      },
    ]
  }

  return (
    <>
      <Board data={boardData}>
        <BoardColumn id={1} title='Planned' state={States.Blue} />
        <BoardColumn id={2} title='Booking' state={States.Yellow} />
        <BoardColumn id={3} title='In Progress' state={States.Green} />
        <BoardColumn id={4} title='Ended' state={States.Orange} />
      </Board>

      <br />
    </>

  )
}

export default App
