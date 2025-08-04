import React, { useEffect, useState } from 'react';
import styles from '@/styles/components/input.module.scss';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useFormContext } from 'react-hook-form';

type InputProps = {
  label: string
  type: React.HTMLInputTypeAttribute
  name: string
  placeholder?: string
  defaultValue?: string
  className?: any
  validations?: any
}

export const Input = ({ label, type, name, placeholder, defaultValue, className, validations, }: InputProps) => {
  const [show, setShow] = useState<boolean>(false)
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (defaultValue)
      setValue(name, defaultValue)

  }, [defaultValue])

  const error = errors[name];

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      <input
        id={label}
        type={show ? 'text' : type}
        placeholder={placeholder ?? " "}
        {...register(name, validations)}
        style={error ? { borderColor: '#f66e6e' } : {}}
      />
      <label htmlFor={label} className={getValues(name) ? styles.filled : ''}>{label}</label>
      {type === 'password' &&
        <div onClick={() => setShow(p => !p)}>

          {show ? <FiEye size={14} /> : <FiEyeOff size={14} />}
        </div>
      }
      {error && <span className={styles.error}>{error.message as string}</span>}
    </div>
  )
}