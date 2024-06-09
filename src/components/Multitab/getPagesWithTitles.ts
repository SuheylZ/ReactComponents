import { ReactElement } from "react"
import { BookProps } from "./Book"
import { PageProps } from "./Page"
import { IPage } from "./interfaces"
import Page from "./Page"

/**
 * takes BookProps and builds an IPage map also returns an array of page captions
 * @param data : BookProps
 * @returns [map: Map<number, IPage>, titles: string[] ]
 */
export function getPagesWithTitles(
  data: BookProps
): [Map<number, IPage>, string[]] {
  const titles: string[] = []
  const map = new Map<number, IPage>()
  const set = new Set<string>()

  const children = data.children
    ? Array.isArray(data.children)
      ? data.children
      : [data.children]
    : Array<ReactElement>()

  for (const it of children) {
    if (it.type === Page) {
      const props = it.props as PageProps
      const { id, title, component, handler } = props

      if (!set.has(id)) {
        const key = map.size
        const value: IPage = {
          id: id,
          title: title,
          component: component,
          enabled: true,
          handler: handler,
          state: undefined
        }
        map.set(key, value)
        titles.push(title)
      } else throw new Error(`duplicate pages cannot be added ${id}`)
    }
  } // End of For loops
  return [map, titles]
}

