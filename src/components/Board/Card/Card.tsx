import { BoardDragKey, CardEvent, DragData, Identity, ItemData, useDataTransfer, useDragStatus } from "../hooks"
import "../../../core.css"
import { CardTag } from "./CardTag"
import { CardTitle } from "./CardTitle"
import { CardBody } from "./CardBody"


export type CardProps = Omit<ItemData, "columnId"> & {
  onClick?: CardEvent
  columnId?: Identity
}

export function Card(props: CardProps) {
  const styles = "w-60 max-h-64 min-h-8 z-50 flex flex-col rounded-md shadow-lg border border-slate-300  bg-slate-200 shadow-slate-600"

  const [isDragging, startDrag, stopDrag] = useDragStatus()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setData] = useDataTransfer<DragData>(BoardDragKey)

  const handleTagClicked = (tag: string) => props.onClick?.(props.id, "tag", tag)
  const handleTitleClicked = (t: string) => props.onClick?.(props.id, "title", t)
  const handleCardClicked = () => props.onClick?.(props.id, "card")

  return (
    <div className={`${isDragging ? styles.replace(/shadow-(\w|-|\d)+/i, "border-2 border-blue-800") : styles}`}>
      <div
        draggable={true}
        onDragStart={(e) => {
          startDrag(e)
          setData(e, { cardId: props.id, columnId: props.columnId })
        }}
        onDragEnd={e => stopDrag(e)}
      >
        <CardTitle title={props.title} onClick={handleTitleClicked} />
        <CardBody description={props.detail} onClick={handleCardClicked} />
        <div className="flex flex-row-reverse">
          <CardTag tag="In Progress" onClick={handleTagClicked} />
        </div>
      </div>
    </div>
  )
}
