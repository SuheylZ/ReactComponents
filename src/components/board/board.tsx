import { BoardColumn } from "./column"
import { IBoardData, IBoardEvents } from "./interfaces"

export type BoardProps = {
  data: IBoardData
  events?: IBoardEvents
}

export function Board(props: BoardProps) {
  const items = [...props.data.items]
  return (
    <div>
      {
        props.data.columns.map(c =>
          <BoardColumn id={c.id} title={c.title} items={items} />
        )
      }
    </div>
  )
}