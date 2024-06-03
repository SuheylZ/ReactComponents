export type CardTitleProps = {
  title: string
  onClick?: (title: string) => void
}

export function CardTitle(props: CardTitleProps) {
  return (<>
    <div className="bg-gray-300 text-black font-semibold text-xs text-left p-1 align-middle max-h-6" onClick={() => props.onClick?.(props.title)}>
      <div className="align-baseline text-yellow-800"><i className="fa-solid fa-layer-group"></i> {props.title}</div>
    </div>
  </>
  )
}