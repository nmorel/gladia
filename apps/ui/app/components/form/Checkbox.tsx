type CheckboxProps = Omit<JSX.IntrinsicElements['input'], 'type' | 'className' | 'style'> & {
  label: string
  name: string
  color?: 'accent' | 'bordered' | 'primary' | 'secondary'
}

const styles = {
  accent: 'checkbox checkbox-accent',
  bordered: 'checkbox checkbox-bordered',
  primary: 'checkbox checkbox-primary',
  secondary: 'checkbox checkbox-secondary',
} as const

export function Checkbox({label, color = 'accent', ...props}: CheckboxProps) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label font-semibold">
        <span className="label-text">{label}</span>
        <input {...props} type="checkbox" className={styles[color]} />
      </label>
    </div>
  )
}
