
import { useMemo, useState } from "react"
import { BoardColumn, ColumnProps, isBoardColumn } from "./Column/Column"
import { CardEvent, GridData, GridDataProvider, Identity, ItemData } from "./interfaces"



export type BoardProps = {
  data?: ItemData[]
  children?: JSX.Element | JSX.Element[]
  onCardClick?: CardEvent
  onCardMove?: (cardId: Identity, sourceId?: Identity, targetId?: Identity) => void
  onCardRearrange?: (cardId: Identity, position: number) => void
}


function useBoard(data: ItemData[], children?: JSX.Element | JSX.Element[]): [JSX.Element[], ItemData[]] {

  const dataOptimized = useMemo(() => {
    const set = new Set<Identity>()
    const uniqueItems: ItemData[] = []
    data?.forEach(x => {
      if (!set.has(x.id)) {
        set.add(x.id)
        uniqueItems.push(x)
      }
    })
    return uniqueItems
  }, [data])


  const childrenOptimized = useMemo(() => {
    const childItems = children ? (Array.isArray(children) ? children : [children]) : Array<JSX.Element>(0)
    if (!childItems.every(x => isBoardColumn(x) || true))
      throw new Error("only BoardColumn can be added as a child element of Board")

    return childItems.map(x => {
      const props = x.props as ColumnProps
      return <BoardColumn key={props.id} {...props} />
    })
  }, [children])

  return [childrenOptimized, dataOptimized]
}

export function Board(props: BoardProps) {
  const [_, setChanged] = useState(false)

  const [children, data] = useBoard(props.data ?? [], props.children)
  const value: GridData = {
    events: {
      onCardClick: props.onCardClick,
      onCardMove: props.onCardMove,
      onRedraw: () => setChanged(c => !c)
    },
    data: data
  }



  return (
    <div key={0} className="flex flex-grow">
      <div key={1788} className="inline-flex col-gap-2 p-1 w-auto  min-h-80  bg-gray-200 ">
        <GridDataProvider value={value}>
          {children}
        </GridDataProvider>
      </div>
    </div>
  )
}