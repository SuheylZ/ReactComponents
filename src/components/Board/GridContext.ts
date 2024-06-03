import { createContext, useContext } from "react"
import { CardEvent, Identity, ItemData } from "./hooks"

/**
 * ===================================================
 *  GRID CONTEXT
 *  to pass data from Board to Columns
 */

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

