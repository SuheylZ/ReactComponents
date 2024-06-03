import { useMemo } from "react"
import { BoardColumn, ColumnProps, isBoardColumn } from "./Column/Column"
import { Identity, ItemData } from "./hooks"



export function useBoard(data: ItemData[], children?: JSX.Element | JSX.Element[]): [JSX.Element[], ItemData[]] {

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
