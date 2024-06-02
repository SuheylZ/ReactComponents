
export type TagProps = {
  tag: string
  onClick?: (tag: string) => void
}

export function Tag(props: TagProps) {
  return (
    <div className="text-xss text-green-600 font-bold text-right p-1 bg-transparent m-1 max-w-18" onClick={() => props.onClick?.(props.tag)}>
      {props.tag}
    </div>
  )
}
