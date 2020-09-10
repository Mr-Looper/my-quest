import React, { useState } from 'react'
import DynamicInput from '../../DynamicInput/DynamicInput'

const StepSetConditions = (props) => {
  const [conditions, setConditions] = useState(props.conditions)
  return (
    <div>
      <DynamicInput callbackDynamicInput={(conditions) => setConditions(conditions)} inputs={conditions} title="Mission conditions"></DynamicInput>
    </div>
  )
}

export default StepSetConditions