import React from 'react'
import type { FieldErrorsImpl, UseFormRegister, FieldValues } from 'react-hook-form'
import { Label } from '@/components/ui/label'

export const Select: React.FC<{
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  width?: string
  showLabel?: boolean
  options?: { label: string; value: string }[]
  register: UseFormRegister<FieldValues>
  errors: Partial<FieldErrorsImpl<FieldValues>>
}> = ({ name, label, placeholder, required, showLabel = true, options, register, errors }) => {
  const error = errors[name]

  return (
    <div className="space-y-2">
      {label && showLabel && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <select
        id={name}
        {...register(name, {
          required: required ? `${label || name} là bắt buộc` : false,
        })}
        className={`h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${error ? 'border-red-500' : ''}`}
      >
        <option value="">{placeholder || 'Chọn...'}</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error.message as string}</p>}
    </div>
  )
}
