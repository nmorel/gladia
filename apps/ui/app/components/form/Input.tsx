type InputProps = JSX.IntrinsicElements['input'] & {
  label: string
  name: string
}

function Input({label, className, ...props}: InputProps) {
  const id = props.id ?? props.name
  return (
    <div className="form-control">
      <label className="cursor-pointer label font-semibold" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>
      <input {...props} id={id} className={`input input-accent ${className || ''}`} />
    </div>
  )
}

export function TextInput(props: Omit<InputProps, 'type'>) {
  return <Input {...props} type="text" />
}

export function EmailInput(props: Omit<InputProps, 'type' | 'autoComplete'>) {
  return <Input {...props} type="email" autoComplete="username" />
}

export function PasswordInput(props: Omit<InputProps, 'type' | 'autoComplete'>) {
  return <Input {...props} type="password" autoComplete="current-password" />
}

export function NumberInput(props: Omit<InputProps, 'type'>) {
  return <Input {...props} type="number" />
}
