import './App.css'
import { Board, BoardColumn, ItemData } from './components/board'
import { States } from './components/board/Column'
import { Box } from './components/Box'
import input from "./data/cards.json"


function App() {
  const data = input as ItemData[]

  return (
    <Box className='flex flex-1 h-[90vh] bg-transparent'>

      <Board data={data}
        onDoubleClick={id => alert(`${id} item clicked`)}
        onItemMoved={(id, _, tid) => {
          const idx = data.findIndex(x => x.id === id)
          console.log(`item id: ${idx}`)
          if (idx < data.length)
            data[idx]!.columnId = tid
        }}>
        <BoardColumn id={1} title='Planned' state={States.Blue} onDoubleClick={() => alert(`Planning chosen`)} />
        <BoardColumn id={2} title='Booking' state={States.Yellow} onDoubleClick={() => alert(`Booking chosen`)} />
        <BoardColumn id={3} title='In Progress' state={States.Green} />
        <BoardColumn id={4} title='Ended' state={States.Orange} />
      </Board>


    </Box>
  )
}

export default App
