import {useState} from 'react'

type CheckboxProps = Omit<
  JSX.IntrinsicElements['input'],
  'value' | 'defaultValue' | 'checked' | 'type'
> & {label: string; name: string}

export function Checkbox({label, defaultChecked, onChange, className, ...props}: CheckboxProps) {
  const [value, setValue] = useState(() => !!defaultChecked)
  return (
    <div className="form-control">
      <label className="cursor-pointer label font-semibold">
        <span className="label-text">{label}</span>
        <input
          {...props}
          type="checkbox"
          className={`checkbox checkbox-accent ${className || ''}`}
          checked={value}
          // set the value in order to send "true" and not "on" when submitting the form
          value={`${value}`}
          onChange={(evt) => {
            setValue(evt.currentTarget.checked)
            onChange?.(evt)
          }}
        />
      </label>
    </div>
  )
}
