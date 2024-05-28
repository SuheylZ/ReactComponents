export type Identity = number | string | undefined

export type ItemData = {
  id: Identity
  title: string
  detail: string
  tags?: Identity[]
  position: number
  columnId: Identity
}

export const DragKey = "card-id"
export type DragData = { cardId: Identity; columnId: Identity }




