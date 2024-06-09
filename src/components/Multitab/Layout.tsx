import { ReactNode } from 'react'

export type LayoutProps = {
  title: string
  stepper: ReactNode
  caption?: string
  page: ReactNode
  back: ReactNode
  next: ReactNode
}


export function Layout(props: LayoutProps) {
  const { title, page, caption, stepper, back, next } = props
  return (
    <div className="div div-flow-col m-2 justify-center align-middle">

      <div item xs={12} justifyContent="flex-start">
        <div className="h-4" >{title}</div>
      </div>

      <div item xs={12}>
        {stepper}
      </div>

      <div item xs={12} style={{ minHeight: '50vh' }}>
        <div justifyContent="left" alignItems="start" display='flex' style={{ width: '100%', height: '100%' }}>
          <div elevation={0} sx={{ p: 3 }} >
            <div variant='h5'>{caption}</div>
            <div display='block'> &nbsp;</div>
            {page}
          </div>
        </div>
      </div>

      <div item xs={12}>
        <div container spacing={1} direction="column" justifyContent="flex-start" >
          <div item xs={2} sm={8} md={9}>
            &nbsp;
          </div>
          <div item xs={10} sm={4} md={3} justifyContent="right" alignItems="end">
            {back}
            &nbsp;&nbsp;
            {next}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Layout