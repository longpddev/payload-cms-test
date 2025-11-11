import React from 'react'
import type { FieldErrorsImpl, UseFormRegister, FieldValues } from 'react-hook-form'
import { Textarea as TextareaUI } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export const Textarea: React.FC<{
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
      <TextareaUI
        id={name}
        {...register(name, {
          required: required ? `${label || name} là bắt buộc` : false,
        })}
        placeholder={placeholder || label}
        rows={4}
        className={`min-h-28 ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-sm text-red-500">{error.message as string}</p>}
    </div>
  )
}
