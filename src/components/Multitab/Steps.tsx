import { useMemo } from 'react'

export type StepsProps = {
  titles: string[]
  current: number
}


export function Steps(props: StepsProps) {
  const { titles, current } = props

  const steps = useMemo(() =>
    titles.map((title, idx) => (
      <Step key={idx}>
        <StepLabel>{title}</StepLabel>
      </Step>
    ))
    , [props.titles])

  return (
    <Stepper activeStep={current}>
      {steps}
    </Stepper>
  )
}

export default Steps