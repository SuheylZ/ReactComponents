export type CardTitleProps = {
  title: string
  onClick?: (title: string) => void
}

export function Title(props: CardTitleProps) {
  return (<>
    <div className="bg-gray-300 text-black font-semibold text-xs text-left p-1 align-middle max-h-6" onClick={() => props.onClick?.(props.title)}>
      {props.title}
    </div>
  </>
  )
}