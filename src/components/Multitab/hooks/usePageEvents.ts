import { Ref, useImperativeHandle } from "react"
import { IPageEvents } from "../interfaces"

export function usePageEvents(ref: Ref<IPageEvents>, impl: IPageEvents) {
  useImperativeHandle(ref, () => impl)
}

