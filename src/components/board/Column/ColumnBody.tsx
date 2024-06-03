import { useState } from "react"
import { Identity, useDataTransfer, DragData, BoardDragKey } from "../interfaces"

export type ColumnBodyProps = {
  children?: JSX.Element | JSX.Element[],
  columnId: Identity
  onCardMove?: (cardId: Identity, sourceId?: Identity, targetId?: Identity) => void
  redraw?: () => void
}
export function ColumnBody(props: ColumnBodyProps) {
  const { children } = props
  const [isDrag, setIsDrag] = useState(false)
  const highlight = () => setIsDrag(true)
  const stopHighlight = () => setIsDrag(false)
  const [getData] = useDataTransfer<DragData>(BoardDragKey)

  return (
    <div className={`w-full h-full flex-grow min-h-max p-1 space-y-2 ${(isDrag ? "border-2 border-blue-600" : "")}`}
      onDrop={(e) => {
        e.preventDefault()
        stopHighlight()
        const data = getData(e)
        if (!!data && data.columnId !== props.columnId) {
          props.onCardMove?.(data.cardId, data.columnId, props.columnId)
          props.redraw?.()
        }
      }}
      onDragOver={e => e.preventDefault()}
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
    </div>
  )
}