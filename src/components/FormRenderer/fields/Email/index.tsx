import React from 'react'
import type { FieldErrorsImpl, UseFormRegister, FieldValues } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Email: React.FC<{
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  width?: string
  showLabel?: boolean
  register: UseFormRegister<FieldValues>
  errors: Partial<FieldErrorsImpl<FieldValues>>
}> = ({ name, label, placeholder, required, showLabel = true, register, errors }) => {
  const error = errors[name]

  return (
    <div className="space-y-2">
      {label && showLabel && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={name}
        type="email"
        {...register(name, {
          required: required ? `${label || name} là bắt buộc` : false,
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email không hợp lệ',
          },
        })}
        placeholder={placeholder || label}
        className={`h-14 ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-sm text-red-500">{error.message as string}</p>}
    </div>
  )
}
