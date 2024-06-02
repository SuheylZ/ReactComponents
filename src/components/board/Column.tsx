import { useMemo, useState } from "react"
import { Box } from "../Box"
import { Card, CardEvent, CardProps, CardSections } from "./Card"
import { BoardDragKey, DragData, Identity, ItemData, useDataTransfer } from "./interfaces"

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
  onClick?: (id: Identity) => void
}
export function Title(props: TitleProps) {

  const stateColors = useMemo(() => new Map<States, string>([
    [States.Blue, "bg-blue-700"],
    [States.Green, "bg-green-700"],
    [States.Orange, "bg-orange-700"],
    [States.Red, "bg-red-700"],
    [States.Yellow, "bg-yellow-700"],
    [States.Black, "bg-black"]
  ]), [props.state])

  return (
    <Box className={`p-1 pl-2 text-left font-bold text-sm border bg-slate-300 border-gray-200`}>
      <div
        className="flex flex-row gap-2 align-middle"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          props.onClick?.(props.id)
        }}
      >
        <div className={`h-4 w-4 border-1 border-blue-500 ${stateColors.get(props.state ?? States.Black)}`}></div>
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
  const [isDrag, setIsDrag] = useState(false)
  const highlight = () => setIsDrag(true)
  const stopHighlight = () => setIsDrag(false)
  const [getData] = useDataTransfer<DragData>(BoardDragKey)

  return (
    <Box className={`w-full h-full flex-grow min-h-max p-1 space-y-2 ${(isDrag ? "border-2 border-blue-600" : "")}`}
      onDrop={(e) => {
        stopHighlight()
        const data = getData(e)
        if (!!data && data.columnId !== props.columnId) {
          props.onItemMoved?.(data.cardId, data.columnId, props.columnId)
          props.redraw?.()
        }
      }}
      onDragOver={e => {
        e.stopPropagation()
      }}
      onDragEnter={e => {
        e.preventDefault()
        highlight()
      }}
      onDragLeave={e => {
        e.preventDefault()
        stopHighlight()
      }}
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
  onClick?: (id: Identity) => void

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
export function BoardColumn(props: ColumnProps): JSX.Element {
  const { id, title, onClick, _onItemClicked, _redraw } = props
  const items = (props._data as ItemData[])?.filter(x => x.columnId === props.id) ?? []
  const handleItemMoved = props._onItemMoved as (cardId: Identity, sourceId?: Identity, targetId?: Identity) => void
  const handleCardClicked: CardEvent = (c: Identity, s: CardSections, d?: object | string | number | boolean | Date) => {
    if (_onItemClicked) {
      const handler = _onItemClicked as CardEvent
      handler(c, s, d)
    }
  }

  return (
    <div className="bg-gray-300 border-gray-00 shadow-lg border w-64 h-fit min-h-full flex flex-col rounded-lg">
      <Title key={`column-title-${id ?? title}`} id={id} title={title} state={props.state ?? States.Black} onClick={() => onClick?.(id)} />
      <Content columnId={props.id} onItemMoved={(cid, sid, tid) => handleItemMoved?.(cid, sid, tid)} redraw={_redraw as () => void}>
        {items.map(x =>

          <Card
            id={x.id}
            title={x.title}
            detail={x.detail}
            position={x.position!}
            key={x.id}
            onClick={handleCardClicked}
            _data={{ columnId: x.columnId }}
          />

        )}
      </Content>
    </div>
  )
}





