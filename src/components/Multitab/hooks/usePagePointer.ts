import { useCallback, useState } from "react"

export function usePagePointer(
  min: number,
  max: number
): [number, () => void, () => void] {
  const [pageIndex, setPageIndex] = useState(min)
  const moveNext = useCallback(
    () =>
      setPageIndex((p) => {
        const allowed = max - 1
        const value = p + 1
        const index = value < allowed ? value : allowed
        return index
      }),
    [max]
  )
  const moveBack = useCallback(
    () =>
      setPageIndex((p) => {
        const value = p - 1
        const index = value < min ? min : value
        return index
      }),
    [min]
  )
  return [pageIndex, moveBack, moveNext]
}

export default usePagePointer
