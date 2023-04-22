import {useState} from 'react'
import {Checkbox, Input} from '../form'

export function DiarizationInput({disabled}: {disabled: boolean}) {
  const [isEnabled, setIsEnabled] = useState(false)
  return (
    <>
      <Checkbox
        label="Toggle diarization"
        name="toggle_diarization"
        checked={isEnabled}
        onChange={(evt) => setIsEnabled(evt.currentTarget.checked)}
        disabled={disabled}
      />

      <Input
        type="number"
        label="Diarization max speakers"
        name="diarization_max_speakers"
        min="2"
        max="10"
        step="1"
        defaultValue="2"
        disabled={disabled || !isEnabled}
        hidden={!isEnabled}
      />
    </>
  )
}
