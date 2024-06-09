import { ReactNode, RefObject, useCallback, useEffect, useMemo } from "react"
import { BookProps } from "../Book"
import { IPage, IPageEvents } from "../interfaces"
import usePagePointer from "./usePagePointer"
import { getPagesWithTitles } from "../getPagesWithTitles"

/**
 * BookLogic
 */
export type BookLogic = {
  index: number
  pages: Map<number, IPage>
  captions: string[]
  page: ReactNode | null
  handleBack: () => void
  handleNext: () => void
  handleDone: () => Promise<void>
  isFirstPage: () => boolean
  isLastPage: () => boolean
}

/**
 * Builds the page logic with movement control and other functionality
 * @param data : BookProps
 * @returns [
 *    index: number, max: number, pages: Map<number, IPage>,
 *    handleBack: ()=>void, handleNext: ()=>void, handleDone: ()=> Promise<void>,
 *    isBackEnabled: ()=> boolean, isNextEnabled: ()=> boolean
 *    ]
 */
export function useBookLogic(data: BookProps): BookLogic {
  // Step 1: fill in the data structure Map<int, IPage>, we will use this to manage every aspect
  const [pages, titles] = useMemo(
    () => getPagesWithTitles(data),
    [data.children]
  )

  // Step 2: calculate Min and Max
  const min = 0
  const max = useMemo(() => (pages.size > 0 ? pages.size : 0), [pages])

  // Step 3: get the page movement logic to track the active page i.e. Our Page pointer
  const [pageIndex, moveBack, moveNext] = usePagePointer(min, max)

  // Step 4: variable to hold our active page
  const page = useMemo(
    () => pages.get(pageIndex)?.component,
    [pages, pageIndex]
  )

  // Step 5: calculate when the back/next button should not be available, ie. the first/last page
  const isFirstPage = useCallback(() => pageIndex === min, [pageIndex, min])
  const isLastPage = useCallback(() => {
    if (max === 0 && pageIndex === 0) return true
    else return pageIndex === max - 1
  }, [pageIndex, max])

  // Step 6: logic to handle back movement but not past first page
  const handleBack = useCallback(() => {
    const p = pages.get(pageIndex) as IPage
    const h = p.handler as RefObject<IPageEvents>
    if (h && h.current) {
      p.state = h.current?.onSave() ?? null
      moveBack()
    } else moveBack()
  }, [pageIndex, pages])

  // step 7: logic to handle next movement. we call on onValidate() so user stays when there are issues
  const handleNext = useCallback(() => {
    const p = pages.get(pageIndex) as IPage
    const h = p.handler as RefObject<IPageEvents>
    if (h && h.current?.onValidate) {
      h.current.onValidate().then((ret) => {
        if (ret) {
          p.state = h.current?.onSave() ?? null
          moveNext()
        }
      })
    } else moveNext()
  }, [pageIndex, pages])

  // Step 8: logic for handle done, if the user has provided the functionality
  const handleDone = useCallback(async () => {
    if (data.onDone) {
      const map = new Map<string, unknown>()
      for (const page of pages.values()) {
        if (page.state) map.set(page.id, page.state)
      }
      await data.onDone(map)
    }
  }, [pages, data.onDone])

  // Step 9: we issue onLoad() if there is one so user can restore the component state
  useEffect(() => {
    const p = pages.get(pageIndex) as IPage
    if (p) {
      const h = p.handler as RefObject<IPageEvents>
      if (h?.current && !!p.state)
        // Only when onLoad is implemented AND if !!state
        h.current.onLoad(p.state)
    }
  }, [pageIndex, pages])

  // Step 10: we return all to be used in the Book
  const obj = {
    index: pageIndex, // current page
    pages: pages, // pages data
    captions: titles,
    page: page,
    handleBack: handleBack, // to handle back button
    handleNext: handleNext, // to handle next button
    handleDone: handleDone, // to handle Done button
    isFirstPage: isFirstPage, // if back button should be available
    isLastPage: isLastPage // if next button should be available
  }

  return obj
}

export default useBookLogic

