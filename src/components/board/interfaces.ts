import { createContext, useContext, useState } from "react"

export type Identity = number | string | undefined

export type ItemData = {
  id: Identity
  title: string
  detail: string
  tags?: Identity[]
  position?: number
  columnId: Identity
}

/**
 * ===================================================
 *  GRID DRAg n DROP
 *  to move card from one column to another
 */
export type DragData = { cardId: Identity; columnId: Identity }
export const BoardDragKey = "drag-data-key"
export function useDataTransfer<D extends object>(
  key: string
): [
  (e: React.DragEvent<HTMLDivElement>) => D | undefined,
  (e: React.DragEvent<HTMLDivElement>, arg: D) => void
] {
  function setData(e: React.DragEvent<HTMLDivElement>, arg: D) {
    const data = JSON.stringify(arg)
    e.dataTransfer?.setData(key, data)
  }

  function getData(e: React.DragEvent<HTMLDivElement>) {
    const data = e.dataTransfer?.getData(key)
    if (data) return JSON.parse(data) as D
    return undefined
  }

  return [getData, setData]
}
export function useDragStatus(): [
  boolean,
  (e: React.DragEvent<HTMLDivElement>) => void,
  (e: React.DragEvent<HTMLDivElement>) => void
] {
  const [isDragging, setDragging] = useState(false)

  const startDragging = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(true)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.dropEffect = "move"
  }

  const stopDragging = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(false)
    e.dataTransfer.effectAllowed = "none"
    e.dataTransfer.dropEffect = "none"
  }

  return [isDragging, startDragging, stopDragging]
}

/**
 * ===================================================
 *  GRID CONTEXT
 *  to pass data from Board to Columns
 */
export type CardSections = "card" | "tag" | "title" | "detail"
export type CardEvent = (
  id: Identity,
  section: CardSections,
  data?: object | number | string | boolean | Date
) => void

export type GridData = {
  events: {
    onCardClick?: CardEvent | undefined
    onCardMove?:
      | ((cardId: Identity, sourceId?: Identity, targetId?: Identity) => void)
      | undefined
    onRedraw?: () => void
  }
  data: ItemData[]
}
const GridContext = createContext<GridData>({} as GridData)
export const GridDataProvider = GridContext.Provider
export const useGridData = () => useContext(GridContext)

