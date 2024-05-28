import './App.css'
import { BoardCard } from './components/board'

function App() {
  return (
    <>    <BoardCard
      id={1}
      title='My Card Title'
      position={0}
      detail='this is the detail'
    />
      <br />
      <BoardCard
        id={1}
        title='My Special trip'
        position={0}
        detail=' because in cases where a browser supports 2 behaviors where the prefixed one may have been implemented slightly'
      />
    </>

  )
}

export default App
