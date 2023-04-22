import type {Ref} from 'react'
import {forwardRef} from 'react'
import {cx} from '~/helpers/classnames'

type InputProps = Omit<JSX.IntrinsicElements['input'], 'className' | 'style'> & {
  label: string
  name: string
  color?: 'accent' | 'bordered' | 'primary' | 'secondary'
}

const styles = {
  accent: {
    file: 'file-input file-input-accent',
    default: 'input input-accent',
  },
  bordered: {
    file: 'file-input file-input-bordered',
    default: 'input input-bordered',
  },
  primary: {
    file: 'file-input file-input-primary',
    default: 'input input-primary',
  },
  secondary: {
    file: 'file-input file-input-secondary',
    default: 'input input-secondary',
  },
} as const

export const Input = forwardRef(function Input(
  {label, color = 'accent', hidden, type = 'text', ...props}: InputProps,
  ref: Ref<HTMLInputElement>
) {
  const id = props.id ?? props.name
  return (
    <div className={cx('form-control', {hidden})}>
      <label className="cursor-pointer label font-semibold" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>
      <input
        ref={ref}
        {...props}
        id={id}
        type={type}
        className={styles[color][type === 'file' ? 'file' : 'default']}
      />
    </div>
  )
})
