import { useMemo } from "react"
import { Box } from "../Box"
import { Card, CardProps } from "./Card"
import { DragData, DragKey, Identity, ItemData } from "./interfaces"

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



export type TitleProps = {
  id: Identity,
  title?: string | undefined,
  state?: States
  onDoubleClick?: (id: Identity) => void
}
export function Title(props: TitleProps) {

  const stateColors = useMemo(() => new Map<States, string>([
    [States.Blue, "text-blue-700"],
    [States.Green, "text-green-700"],
    [States.Orange, "text-orange-700"],
    [States.Red, "text-red-700"],
    [States.Yellow, "text-yellow-700"],
    [States.Black, "text-black"]
  ]), [props.state])

  return (
    <Box className={` ${stateColors.get(props.state ?? States.Black)} p-1 pl-2 text-left font-bold text-sm border bg-slate-300 border-gray-200`}>
      <div onDoubleClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        props.onDoubleClick?.(props.id)
      }} >
        {props.title}
      </div>
    </Box>
  )
}


export type ContentProps = {
  children?: JSX.Element | JSX.Element[],
  columnId: Identity
  onItemMoved?: (cardId: Identity, sourceId?: Identity, targetId?: Identity) => void
  redraw?: () => void
}
export function Content(props: ContentProps) {
  const { children } = props

  return (
    <Box className={`w-full h-full flex-grow min-h-max p-1 space-y-2`}
      onDrop={(e) => {
        const data = JSON.parse(e.dataTransfer.getData(DragKey)) as DragData
        if (data.columnId !== props.columnId) {
          props.onItemMoved?.(data.cardId, data.columnId, props.columnId)
          props.redraw?.()
        }
      }}
      onDragOver={e => { e.stopPropagation() }}
    >
      {children}
    </Box>
  )
}



export type ColumnProps = {
  id: Identity
  title?: string
  hint?: string
  state?: States
  items?: CardProps[],
  onDoubleClick?: (id: Identity) => void

  /**
   * Internal property-- DO NOT USE
   */
  _data?: object
  /**
   * Internal property-- DO NOT USE
   */
  _onItemClicked?: object
  /**
   * Internal property-- DO NOT USE
   */
  _onItemMoved?: object
  /**
 * Internal property-- DO NOT USE
 */
  _redraw?: object
}
export function BoardColumn(props: ColumnProps) {
  const { id, title, onDoubleClick, _onItemClicked, _redraw } = props
  const items = (props._data as ItemData[])?.filter(x => x.columnId === props.id) ?? []
  const onItemMoved = props._onItemMoved as (cardId: Identity, sourceId?: Identity, targetId?: Identity) => void

  return (
    <Box className="bg-gray-300 border-gray-00 shadow-lg border w-64 h-fit min-h-full flex flex-col ">
      <Title key={`column-title-${id ?? title}`} id={id} title={title} state={props.state ?? States.Black} onDoubleClick={() => onDoubleClick?.(id)} />
      <Content columnId={props.id} onItemMoved={(cid, sid, tid) => onItemMoved?.(cid, sid, tid)} redraw={_redraw as () => void}>
        {items.map(x =>

          <Card
            id={x.id}
            title={x.title}
            detail={x.detail}
            position={x.position}
            key={x.id}
            onDoubleClick={e => {
              const handler = _onItemClicked as (id: Identity) => void
              handler?.(e)
            }}
            _data={{ columnId: x.columnId }}
          />

        )}
      </Content>
    </Box>
  )
}





