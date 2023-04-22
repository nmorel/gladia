import {LANGUAGES} from '@gladia/zod-types'
import {useState} from 'react'
import {Checkbox, Select} from '../form'

export function TranslationInput({disabled}: {disabled: boolean}) {
  const [isEnabled, setIsEnabled] = useState(false)
  return (
    <>
      <Checkbox
        label="Toggle translation"
        name="toggle_direct_translate"
        checked={isEnabled}
        onChange={(evt) => setIsEnabled(evt.currentTarget.checked)}
        disabled={disabled}
      />

      <Select
        label="Target translation language"
        name="target_translation_language"
        options={LANGUAGES}
        defaultValue={LANGUAGES['English']}
        disabled={disabled || !isEnabled}
        hidden={!isEnabled}
      />
    </>
  )
}
