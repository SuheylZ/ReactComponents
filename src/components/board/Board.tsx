
import { Box } from "../Box"
import { BoardColumn, ColumnProps } from "./Column"
import { IBoardData, IBoardEvents } from "./interfaces"

export type BoardProps = {
  data?: IBoardData
  events?: IBoardEvents
  children?: JSX.Element | JSX.Element[]
}

export function Board(props: BoardProps) {
  const { children } = props
  const columnType = (<BoardColumn id={undefined} title={""} />).type


  if (children) {
    if (Array.isArray(children) && children.every(x => x.type === columnType)) {
      const t0 = children.map(x => x.props as ColumnProps)
      console.log(t0)
    }
    else if (!Array.isArray(children) && (children.type === columnType)) {
      const t0 = children.props
      console.log(t0)
    }
    else throw new Error("only BoardColumn is supported as children")
  }


  return (
    <Box className="flex">
      <Box className="inline-flex col-gap-2 p-1 w-auto  h-80 bg-gray-200 ">
        {props.children}
      </Box>
    </Box>
  )
}