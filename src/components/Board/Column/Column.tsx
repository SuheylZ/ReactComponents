
import { Card, CardProps } from "../Card"
import { useGridData } from "../GridContext"
import { CardSections, Identity } from "../hooks"
import { ColumnBody } from "./ColumnBody"
import { ColumnTitle } from "./ColumnTitle"

export enum States {
  Red,
  Blue,
  Green,
  Yellow,
  Orange,
  Black
}

export function isBoardColumn(obj: JSX.Element | null | undefined): obj is React.ReactElement<ColumnProps> {
  const columnType = (<BoardColumn id={undefined} title={""} />).type
  return obj !== null && obj !== undefined && obj.type === columnType
}


export type ColumnProps = {
  id: Identity
  title?: string
  hint?: string
  items?: CardProps[],
  onClick?: (id: Identity) => void
}



export function BoardColumn(props: ColumnProps): JSX.Element {
  const { id, title, onClick } = props
  const ctx = useGridData()
  const data = ctx.data.filter(x => x.columnId === props.id) ?? []

  const handleItemMove = ctx.events.onCardMove
  const handleCardClick = (c: Identity, s: CardSections, d?: object | string | number | boolean | Date) => {
    if (ctx.events.onCardClick)
      ctx.events.onCardClick(c, s, d)
  }
  const handleRedraw = () => ctx.events.onRedraw?.()


  return (
    <div className="bg-gray-300 border-gray-00 shadow-lg border w-64 h-fit min-h-full flex flex-col rounded-lg">
      <ColumnTitle key={`column-title-${id ?? title}`} id={id} title={title} onClick={() => onClick?.(id)} />
      <ColumnBody columnId={props.id} onCardMove={(cid, sid, tid) => handleItemMove?.(cid, sid, tid)} redraw={handleRedraw}>

        {data.map(x =>
          <Card
            id={x.id}
            title={x.title}
            detail={x.detail}
            position={x.position!}
            key={x.id}
            onClick={handleCardClick}
            columnId={x.columnId}
          />
        )}

      </ColumnBody>
    </div>
  )
}





