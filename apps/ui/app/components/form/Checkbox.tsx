type CheckboxProps = Omit<JSX.IntrinsicElements['input'], 'type'> & {label: string; name: string}

export function Checkbox({label, className, ...props}: CheckboxProps) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label font-semibold">
        <span className="label-text">{label}</span>
        <input
          {...props}
          type="checkbox"
          className={`checkbox checkbox-accent ${className || ''}`}
        />
      </label>
    </div>
  )
}
