import { DragEvent } from "react"


export type BoxProps = {


  className: string,
  children?: React.ReactNode | React.ReactNode[]
  onDragOver?: React.DragEventHandler<HTMLDivElement>
  onDrop?: React.DragEventHandler<HTMLDivElement>
  onDragLeave?: (e: DragEvent<HTMLDivElement>) => void
  onDragEnter?: (e: DragEvent<HTMLDivElement>) => void
  onDropCapture?: (e: DragEvent<HTMLDivElement>) => void
}

export function Box(props: BoxProps) {




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

    <div className={props.className}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDropCapture={e => {
        props.onDropCapture?.(e)
      }}
      onDragStart={e => {
        e.stopPropagation()
      }}
      onDragEnd={e => {
        e.stopPropagation()
      }}
      onDragEnter={e => {
        props.onDragEnter?.(e)
      }}
      onDragLeave={e => {
        props.onDragLeave?.(e)
      }}

    >
      {props.children}
    </div>

  )
}