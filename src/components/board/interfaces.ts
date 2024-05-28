export type Identity = number | string | undefined

export type ColumnData = {
  id: Identity
  title: string
  hint?: string
}

export type ItemData = {
  id: Identity
  title: string
  detail: string
  tags?: Identity[]
  position: number
  columnId: Identity
}

export type TagData = {
  id: Identity
  title: string
  color: string
}

export interface IBoardData {
  // readonly columns: ReadonlyArray<Readonly<ColumnData>>
  readonly items: ReadonlyArray<Readonly<ItemData>>
  // readonly tags: ReadonlyArray<Readonly<TagData>>
}

export interface IBoardEvents {
  // Item movement
  onItemAdded(item_id: Identity, col_id: Identity): void
  onItemRemoved(item_id: Identity, col_id: Identity): void
  onItemArranged(itemid: Identity, position: number): void
  // Clicking Events
  onItemClicked(item_id: Identity): void
  onColumnClicked(col_id: Identity): void
}



