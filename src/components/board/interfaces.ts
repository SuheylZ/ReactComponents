export type Identity = number | string | undefined

export type ItemData = {
  id: Identity
  title: string
  detail: string
  tags?: Identity[]
  position?: number
  columnId: Identity
}

const DragKey = "drag-data-key"
export type DragData = { cardId: Identity; columnId: Identity }

export function setDragData(e: React.DragEvent<HTMLDivElement>, arg: DragData) {
  const data = JSON.stringify(arg)
  e.dataTransfer?.setData(DragKey, data)
}
export function getDragData(e: React.DragEvent<HTMLDivElement>) {
  const data = e.dataTransfer?.getData(DragKey)
  if (data) return JSON.parse(data) as DragData
  return { cardId: undefined, columnId: undefined } as DragData
}







