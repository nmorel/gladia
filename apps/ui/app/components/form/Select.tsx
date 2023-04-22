import {cx} from '~/helpers/classnames'

type SelectProps = Omit<JSX.IntrinsicElements['select'], 'className' | 'style'> & {
  label: string
  name: string
  options: Record<string, string>
  color?: 'accent' | 'bordered' | 'primary' | 'secondary'
}

const styles = {
  accent: 'select select-accent',
  bordered: 'select select-bordered',
  primary: 'select select-primary',
  secondary: 'select select-secondary',
} as const

export function Select({label, color = 'accent', options, hidden, ...props}: SelectProps) {
  const id = props.id ?? props.name
  return (
    <div className={cx('form-control', {hidden})}>
      <label className="cursor-pointer label font-semibold" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>
      <select {...props} id={id} className={styles[color]}>
        {Object.entries(options).map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
