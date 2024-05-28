
import { useMemo, useState } from "react"
import { BoardColumn, ColumnProps, isBoardColumn } from "./Column"
import { Identity, ItemData } from "./interfaces"
import { Box } from "../Box"


export type BoardProps = {
  data?: ItemData[]
  children?: JSX.Element | JSX.Element[]

  onDoubleClick?: (id: Identity) => void
  onItemMoved?: (cardId: Identity, sourceId?: Identity, targetId?: Identity) => void
  onItemArranged?: (cardId: Identity, position: number) => void
}


export function Board(props: BoardProps) {
  const [isChanged, setChanged] = useState(false)

  const childItems = useMemo(() => (props.children === null) || (props.children === undefined) ? [] :
    Array.isArray(props.children) ? props.children : [props.children], [isChanged])

  const data = useMemo(() => {
    const set = new Set<Identity>()
    const filtered: ItemData[] = []
    props.data?.forEach(x => {
      if (!set.has(x.id)) {
        set.add(x.id)
        filtered.push(x)
      }
    })
    return filtered

  }, [props.data])

  const isValid = childItems.every(x => isBoardColumn(x) || true)
  if (!isValid)
    throw new Error("only BoardColumn can be added as a child element of Board")

  const children = useMemo(() => {
    return childItems.map(x => {
      const newprops = {
        ...x.props,
        _data: data,
        _onItemClicked: props.onDoubleClick,
        _onItemMoved: props.onItemMoved,
        _redraw: () => {
          setChanged(c => !c)
        }
      } as ColumnProps
      return <BoardColumn key={newprops.id} {...newprops} />
    })
  }, [props.children, isChanged])


  return (
    <Box key={0} className="flex flex-grow">
      <Box key={1788} className="inline-flex col-gap-2 p-1 w-auto  min-h-80  bg-gray-200 ">
        {children}
      </Box>
    </Box>
  )
}