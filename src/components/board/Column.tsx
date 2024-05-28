import { useMemo, useState } from "react"
import { Box } from "../Box"
import { CardProps } from "./Card"
import { Identity } from "./interfaces"



export type ColumnTitleProps = {
  id: Identity,
  title?: string | undefined,
  state?: States
  onDoubleClick?: (id: Identity) => void
}

export function ColumnTitle(props: ColumnTitleProps) {

  const stateColors = useMemo(() => new Map<States, string>([
    [States.Blue, "text-blue-700"],
    [States.Green, "text-green-700"],
    [States.Orange, "text-orange-700"],
    [States.Red, "text-red-700"],
    [States.Yellow, "text-yellow-700"],
    [States.Black, "text-black"]
  ]), [props.state])

  return (
    <Box className={`bg-slate-300 ${stateColors.get(props.state ?? States.Black)} font-bold text-sm border border-gray-400`}>
      <div onDoubleClick={() => props.onDoubleClick?.(props.id)} >
        {props.title ?? "No Title"}
      </div>
    </Box>
  )
}



export type ColumnContentProps = { children?: JSX.Element | JSX.Element[] }

export function ColumnContent(props: ColumnContentProps) {
  const { children } = props
  const [isDropped, setDropped] = useState(false)

  return (
    <Box className={`w-full h-full min-h-max flex-grow ${isDropped ? "bg-blue-700" : " bg-yellow-300"} p-1`}
      onDrop={(e) => {
        //const t0 = e.dataTransfer.getData("card")
        setDropped(true)
      }}
      onDragOver={e => { }}
    >
      {children}
    </Box>
  )
}

export enum States {
  Red,
  Blue,
  Green,
  Yellow,
  Orange,
  Black
}

export type ColumnProps = {
  id: Identity
  title?: string
  hint?: string
  state?: States
  items?: CardProps[],
  onClick?: (id: Identity) => void
}


export function BoardColumn(props: ColumnProps) {
  const { id, title, onClick } = props

  return (
    <Box className="bg-gray-400 border-gray-500 shadow-lg border w-64 h-fit min-h-full flex flex-col">
      <ColumnTitle key={`column-title-${id ?? title}`} id={id} title={title} state={props.state ?? States.Black} onDoubleClick={() => onClick?.(id)} />
      <ColumnContent>
      </ColumnContent>
    </Box>
  )
}

