
import { Identity } from "../interfaces"

export type TitleProps = {
  id: Identity,
  title?: string | undefined,
  // state?: States
  onClick?: (id: Identity) => void
}
export function Title(props: TitleProps) {

  return (
    <div className={`p-1 pl-2 text-left font-bold text-sm border bg-slate-300 border-gray-200`}>
      <div
        className="flex flex-row gap-2"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          props.onClick?.(props.id)
        }}
      >
        <div className="align-baseline"><i className="fa-solid fa-bars"></i></div>
        {props.title}
      </div>
    </div>
  )
}

