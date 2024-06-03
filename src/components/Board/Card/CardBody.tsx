
export type CardBodyProps = {
  description?: string
  onClick?: () => void
}

export function CardBody(props: CardBodyProps) {
  return (
    <div className="text-left text-xs text-slate-800 bg-transparent p-1" onClick={() => props.onClick?.()}>
      {props.description}
    </div>
  )
}