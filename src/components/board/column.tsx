import { Card, BoardCardProps } from "./card"
import { ColumnData, Identity } from "./interfaces"


export type ColumnProps = ColumnData & {
  items?: BoardCardProps[],
  onClick?: (id: Identity) => void
}


export function BoardColumnTitle(props: {
  id: Identity,
  title?: string,
  onClick?: (id: Identity) => void
}) {
  return (
    <div
      className="bg-slate-800 text-color-yellow-600 font-bold"
      onClick={() => props.onClick?.(props.id)}
    >
      {props.title && "No Title"}
    </div>
  )
}

export type BoardColumnContentProps = { cards: BoardCardProps[] }
export function BoardColumnContent(props: BoardColumnContentProps) {
  const { cards } = props
  return (
    <div className="w-3/3 bg-sky-400">
      {cards.sort(c => c.position).map(c => <Card {...c} />)}
    </div>
  )
}

export function BoardColumn(props: ColumnProps) {
  const { id, title, onClick, items } = props
  const cards = items ?? Array<BoardCardProps>()

  return (
    <div className="bg-slate-600 w-9">
      <BoardColumnTitle title={title} id={id} onClick={() => onClick?.(id)} key={id} />
      <BoardColumnContent cards={cards} />
    </div>
  )
}

