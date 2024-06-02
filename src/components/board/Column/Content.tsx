import { useState } from "react"
import { Box } from "../../Box"
import { Identity, useDataTransfer, DragData, BoardDragKey } from "../interfaces"

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