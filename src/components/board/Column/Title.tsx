import { useMemo } from "react"
import { Identity } from "../interfaces"
import { States } from "./Column"

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
    <div className={`p-1 pl-2 text-left font-bold text-sm border bg-slate-300 border-gray-200`}>
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
    </div>
  )
}

