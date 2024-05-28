
import { Box } from "../Box"
import { BoardColumn, ColumnProps } from "./Column"
import { IBoardData, IBoardEvents } from "./interfaces"

export type BoardProps = {
  data?: IBoardData
  events?: IBoardEvents
  children?: JSX.Element | JSX.Element[]
}

export function Board(props: BoardProps) {

  const columnType = (<BoardColumn id={undefined} title={""} _data={undefined} />).type


  const children = (() => {
    if (props.children) {
      if (Array.isArray(props.children) && props.children.every(x => x.type === columnType)) {
        return props.children.map(x => {
          const newprops = { ...x.props, _data: props.data } as ColumnProps
          return < BoardColumn key={newprops.id} {...newprops} />
        })
      }
      else if (!Array.isArray(props.children) && (props.children?.type === columnType)) {
        const newprops = { ...props, _data: props.data } as ColumnProps
        return < BoardColumn key={newprops.id} {...newprops} />
      }
      else return props.children
    }
    else return undefined
  })()


  return (
    <Box key={0} className="flex">
      <Box key={1788} className="inline-flex col-gap-2 p-1 w-auto  h-80 bg-gray-200 ">
        {children}
      </Box>
    </Box>
  )
}