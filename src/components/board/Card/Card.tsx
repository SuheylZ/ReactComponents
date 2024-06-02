import { BoardDragKey, DragData, Identity, ItemData, useDataTransfer, useDragStatus } from "../interfaces"
import "../../../core.css"
import { Tag } from "./Tag"
import { Title } from "./Title"
import { Contents } from "./Content"


export type CardSections = "card" | "tag" | "title" | "detail"
export type CardEvent = (id: Identity, section: CardSections, data?: object | number | string | boolean | Date) => void

export type CardProps = Omit<ItemData, "columnId"> & {
  onClick?: CardEvent
  /**
   * Internal Attribute -- DO NOT USE
   */
  _data?: object
}

export function Card(props: CardProps) {
  const styles = "w-60 max-h-64 min-h-8 z-50 flex flex-col rounded-md shadow-lg border border-slate-300  bg-slate-200 shadow-slate-600"
  const { columnId } = props._data as { columnId: Identity }
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
          setData(e, { cardId: props.id, columnId: columnId })
        }}
        onDragEnd={e => stopDrag(e)}
      >
        <Title title={props.title} onClick={handleTitleClicked} />
        <Contents description={props.detail} onClick={handleCardClicked} />
        <div className="flex flex-row-reverse">
          <Tag tag="In Progress" onClick={handleTagClicked} />
        </div>
      </div>
    </div>
  )
}
