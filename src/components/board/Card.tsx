import { DragKey, Identity, ItemData } from "./interfaces"
import "../../core.css"
import { Box } from "../Box"


export type CardProps = Omit<ItemData, "columnId"> & {
  onDoubleClick?: (id: Identity) => void
  /**
   * Internal Attribute -- DO NOT USE
   */
  _data?: object
}


function Title(props: { title: string }) {
  return (
    <Box className="bg-gray-300 text-black font-semibold text-xs text-left p-1 align-middle max-h-6" >
      {props.title}
    </Box>
  )
}

function Contents(props: { description?: string }) {
  return (
    <Box className="text-left text-xs text-slate-800 bg-transparent p-1">
      {props.description}
    </Box>
  )
}

function TagPanel(props: { children?: JSX.Element | JSX.Element[] }) {
  return (
    <Box className="flex flex-row-reverse">
      {props.children}
    </Box>
  )
}
function Tag(props: { tag: string }) {
  return (
    <Box className="text-xss text-green-600 font-bold text-right p-1 bg-transparent m-1 max-w-18">
      {props.tag}
    </Box>
  )
}

export function Card(props: CardProps) {
  const { columnId } = props._data as { columnId: Identity }

  return (
    <Box className="w-60 max-h-64 min-h-8 z-50 flex flex-col rounded-md shadow-lg border border-slate-300  bg-slate-200 shadow-slate-600">

      <div
        onDoubleClick={() => props.onDoubleClick?.(props.id)}
        draggable={true}
        onDragStart={(e) => {
          const data = JSON.stringify({ cardId: props.id, columnId: columnId })
          e.dataTransfer.setData(DragKey, data)
          e.dataTransfer.effectAllowed = "linkMove"
          e.dataTransfer.dropEffect = "move"
        }}
        onDragEnd={(e) => {
          e.dataTransfer.effectAllowed = "none"
          e.dataTransfer.dropEffect = "copy"
        }}
      >

        <Title title={props.title} />
        <Contents description={props.detail} />
        <TagPanel>
          <Tag tag="In Progress" />
        </TagPanel>
      </div>

    </Box>
  )
}
