import React from 'react'
import type { FieldErrorsImpl, UseFormRegister, FieldValues } from 'react-hook-form'
import { Checkbox as CheckboxUI } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const Checkbox: React.FC<{
  name: string
  label?: string
  required?: boolean
  width?: string
  showLabel?: boolean
  register: UseFormRegister<FieldValues>
  errors: Partial<FieldErrorsImpl<FieldValues>>
}> = ({ name, label, required, showLabel = true, register, errors }) => {
  const error = errors[name]

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <CheckboxUI
          id={name}
          {...register(name, {
            required: required ? `${label || name} là bắt buộc` : false,
          })}
        />
        {label && showLabel && (
          <Label
            htmlFor={name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error.message as string}</p>}
    </div>
  )
}
