
import { useState } from "react"
import { CardEvent, Identity, CardData } from "./hooks"
import { useBoard } from "./useBoard"
import { GridData, GridDataProvider } from "./GridContext"


export type BoardProps = {
  data?: CardData[]
  children?: JSX.Element | JSX.Element[]
  onCardClick?: CardEvent
  onCardMove?: (cardId: Identity, sourceId?: Identity, targetId?: Identity) => void
  onCardRearrange?: (cardId: Identity, position: number) => void
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