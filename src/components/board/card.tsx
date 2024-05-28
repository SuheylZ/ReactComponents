import { Identity, ItemData } from "./interfaces"
import "../../core.css"


export type BoardCardProps = ItemData & { onItemClick?: (id: Identity) => void }


function CardTitle(props: { title: string }) {
  return (
    <div className="bg-slate-600 text-white font-semibold text-xs text-left p-1 align-middle max-h-6" >
      {props.title}
    </div>
  )
}

function CardContent(props: { description?: string }) {
  return (
    <div className="text-left text-xs text-slate-800 bg-transparent p-1 min-h-14">
      {props.description}
    </div>
  )
}

function CardTag(props: { tag: string }) {
  return (
    <div className="text-xss text-green-600 font-bold text-right p-1 bg-transparent m-1 max-w-18">
      {props.tag}
    </div>
  )
}

export function Card(props: BoardCardProps) {
  return (
    <div className="min-w-32 max-w-64 max-h-50 min-h-16 border rounded-s border-slate-700 flex flex-col"
      onClick={() => props.onItemClick?.(props.id)}
      onDrag={(e) => { e.dataTransfer.dropEffect = "move" }}
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "linkMove"
        e.dataTransfer.dropEffect = "move"
      }}
      onDragEnd={(e) => {
        e.dataTransfer.effectAllowed = "none"
        e.dataTransfer.dropEffect = "none"
      }}
    >
      <CardTitle title={props.title} />
      <CardContent description={props.detail} />
      <div className="flex flex-row-reverse"
      >
        <CardTag tag="In Progress" />
      </div>
    </div>
  )
}
