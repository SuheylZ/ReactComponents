import { ReactNode, Ref } from "react"

export interface IPageEvents {
  onValidate: () => Promise<boolean>
  onSave: () => object | string | unknown
  onLoad: (arg: object | string | unknown) => void
}

export interface IPage {
  id: string
  title: string
  component: ReactNode
  enabled?: boolean
  handler?: Ref<IPageEvents>
  state: unknown | undefined
}







