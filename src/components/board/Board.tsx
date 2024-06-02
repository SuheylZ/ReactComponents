
import { useMemo, useState } from "react"
import { BoardColumn, ColumnProps, isBoardColumn } from "./Column/Column"
import { Identity, ItemData } from "./interfaces"
import { CardSections } from "./Card/Card"


export type BoardProps = {
  data?: ItemData[]
  children?: JSX.Element | JSX.Element[]
  onCardClick?: (id: Identity, section: CardSections, data?: object | string | number | boolean | Date) => void
  onCardMove?: (cardId: Identity, sourceId?: Identity, targetId?: Identity) => void
  onCardRearrange?: (cardId: Identity, position: number) => void
}


function useBoard(props: BoardProps) {
  const [isChanged, setChanged] = useState(false)

  const childItems = (props.children === null) || (props.children === undefined) ? [] :
    Array.isArray(props.children) ? props.children : [props.children]

  const isValid = childItems.every(x => isBoardColumn(x) || true)
  if (!isValid)
    throw new Error("only BoardColumn can be added as a child element of Board")

  const data = useMemo(() => {
    const set = new Set<Identity>()
    const uniqueItems: ItemData[] = []
    props.data?.forEach(x => {
      if (!set.has(x.id)) {
        set.add(x.id)
        uniqueItems.push(x)
      }
    })
    return uniqueItems

  }, [props.data])

  const children = useMemo(() => {
    return childItems.map(x => {
      const newprops = {
        ...x.props,
        _data: data,
        _onItemClicked: props.onCardClick,
        _onItemMoved: props.onCardMove,
        _redraw: () => {
          setChanged(c => !c)
        }
      } as ColumnProps
      return <BoardColumn key={newprops.id} {...newprops} />
    })
  }, [props.children, isChanged])

  return children
}

export function Board(props: BoardProps) {
  const children = useBoard(props)

  return (
    <div key={0} className="flex flex-grow">
      <div key={1788} className="inline-flex col-gap-2 p-1 w-auto  min-h-80  bg-gray-200 ">
        {children}
      </div>
    </div>
  )
}