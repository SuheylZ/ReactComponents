

export type BoxProps = {
  className: string,
  children?: React.ReactNode | React.ReactNode[]
  onDragOver?: React.DragEventHandler<HTMLDivElement>
  onDrop?: React.DragEventHandler<HTMLDivElement>
}

export function Box(props: BoxProps) {


  const isDropTarget = props.onDrop && props.onDragOver

  const onDragOver = props.onDragOver ? (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    props.onDragOver?.(e)
  } : () => { }

  const onDrop = props.onDrop ? (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    props.onDrop?.(e)
  } : () => { }



  return (

    <div className={props.className} onDragOver={onDragOver} onDrop={onDrop} onDragEnterCapture={() => {
      if (isDropTarget) { }

    }}
      onDragEndCapture={() => {
        if (isDropTarget) { }

      }}>
      {props.children}
    </div>

  )
}