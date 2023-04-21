type FileInputProps = Omit<JSX.IntrinsicElements['input'], 'type'> & {
  label: string
  name: string
}

export function FileInput({label, className, ...props}: FileInputProps) {
  const id = props.id ?? props.name
  return (
    <div className="form-control">
      <label className="cursor-pointer label font-semibold" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>
      <input
        {...props}
        id={id}
        type="file"
        className={`file-input file-input-accent file-input-sm ${className || ''}`}
      />
    </div>
  )
}
