
import { Card, CardEvent, CardProps, CardSections } from "../Card"
import { Identity, ItemData } from "../interfaces"
import { Content } from "./Content"
import { Title } from "./Title"

export enum States {
  Red,
  Blue,
  Green,
  Yellow,
  Orange,
  Black
}
export function isBoardColumn(obj: JSX.Element | null | undefined): obj is React.ReactElement<ColumnProps> {
  const columnType = (<BoardColumn id={undefined} title={""} />).type
  return obj !== null && obj !== undefined && obj.type === columnType
}






export type ColumnProps = {
  id: Identity
  title?: string
  hint?: string
  items?: CardProps[],
  onClick?: (id: Identity) => void
  /**
   * Internal property-- DO NOT USE
   */
  _data?: object
  /**
   * Internal property-- DO NOT USE
   */
  _onItemClicked?: object
  /**
   * Internal property-- DO NOT USE
   */
  _onItemMoved?: object
  /**
 * Internal property-- DO NOT USE
 */
  _redraw?: object
}


export function BoardColumn(props: ColumnProps): JSX.Element {
  const { id, title, onClick, _onItemClicked, _redraw } = props
  const items = (props._data as ItemData[])?.filter(x => x.columnId === props.id) ?? []
  const handleItemMoved = props._onItemMoved as (cardId: Identity, sourceId?: Identity, targetId?: Identity) => void
  const handleCardClicked: CardEvent = (c: Identity, s: CardSections, d?: object | string | number | boolean | Date) => {
    if (_onItemClicked) {
      const handler = _onItemClicked as CardEvent
      handler(c, s, d)
    }
  }

  return (
    <div className="bg-gray-300 border-gray-00 shadow-lg border w-64 h-fit min-h-full flex flex-col rounded-lg">
      <Title key={`column-title-${id ?? title}`} id={id} title={title} onClick={() => onClick?.(id)} />
      <Content columnId={props.id} onItemMoved={(cid, sid, tid) => handleItemMoved?.(cid, sid, tid)} redraw={_redraw as () => void}>
        {items.map(x =>

          <Card
            id={x.id}
            title={x.title}
            detail={x.detail}
            position={x.position!}
            key={x.id}
            onClick={handleCardClicked}
            _data={{ columnId: x.columnId }}
          />

        )}
      </Content>
    </div>
  )
}





