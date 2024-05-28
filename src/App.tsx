import { useMemo } from 'react'
import './App.css'
import { Board, BoardColumn, ItemData } from './components/board'
import { States } from './components/board/Column'


function App() {

  const data = useMemo(() => [
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
    }] as ItemData[], [])


  return (
    <Board data={data}
      onDoubleClick={id => alert(` ${id} item clicked`)}
      onItemMoved={(id, sid, tid) => {
        const idx = data.findIndex(x => x.id === id)
        if (idx < data.length) {
          data[idx]!.columnId = tid
        }
      }}>
      <BoardColumn id={1} title='Planned' state={States.Blue} onDoubleClick={() => alert(`Planning chosen`)} />
      <BoardColumn id={2} title='Booking' state={States.Yellow} onDoubleClick={() => alert(`Booking chosen`)} />
      <BoardColumn id={3} title='In Progress' state={States.Green} />
      <BoardColumn id={4} title='Ended' state={States.Orange} />
    </Board>
  )
}

export default App
