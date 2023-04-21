type SelectProps = JSX.IntrinsicElements['select'] & {
  label: string
  name: string
  options: {value: string; label?: string}[]
}

export function Select({label, className, options, ...props}: SelectProps) {
  const id = props.id ?? props.name
  return (
    <div className="form-control">
      <label className="cursor-pointer label font-semibold" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>
      <select {...props} id={id} className={`select select-accent ${className || ''}`}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label ?? opt.value}
          </option>
        ))}
      </select>
    </div>
  )
}
