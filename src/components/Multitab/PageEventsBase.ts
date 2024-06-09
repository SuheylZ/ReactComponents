import { IPageEvents as IPageEvents } from "./interfaces"

export class PageEventsBase implements IPageEvents {
  onValidate(): Promise<boolean> {
    return new Promise<boolean>((r) => r(true))
  }
  onSave(): object | string | unknown | null {
    return null
  }
  onLoad(arg: object | string | unknown) {
    if (arg) {
      // not implemented, for the child classes only
    }
  }
}

export default PageEventsBase

