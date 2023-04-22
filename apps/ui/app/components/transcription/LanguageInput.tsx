import {LANGUAGES, LANGUAGE_BEHAVIOURS} from '@gladia/zod-types'
import {useState} from 'react'
import {Select} from '../form'

type Behaviour = (typeof LANGUAGE_BEHAVIOURS)[keyof typeof LANGUAGE_BEHAVIOURS]

export function LanguageInput({disabled}: {disabled: boolean}) {
  const [behaviour, setBehaviour] = useState<Behaviour>(
    LANGUAGE_BEHAVIOURS['Automatic single language']
  )
  const isManual = behaviour === 'manual'
  return (
    <>
      <Select
        label="Language behaviour"
        name="language_behaviour"
        options={LANGUAGE_BEHAVIOURS}
        value={behaviour}
        onChange={(evt) => setBehaviour(evt.currentTarget.value as Behaviour)}
        required
        disabled={disabled}
      />

      <Select
        label="Language"
        name="language"
        hidden={!isManual}
        options={LANGUAGES}
        defaultValue={LANGUAGES['English']}
        disabled={disabled || !isManual}
      />
    </>
  )
}
