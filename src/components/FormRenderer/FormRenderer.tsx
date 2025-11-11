'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import type { Form as FormType } from '@/payload-types'
import { IconLoading } from '@/components/PageLoadingAnimation'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface FormRendererProps {
  form: FormType
  className?: string
  showLabel?: boolean
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  form,
  className = '',
  showLabel = true,
}) => {
  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = form || {}

  const formMethods = useForm({
    defaultValues: {},
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: any) => {
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        setIsLoading(true)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message:
                (res as { errors?: { message: string }[] })?.errors?.[0]?.message ||
                'Internal Server Error',
              status: (res as { status?: number })?.status?.toString(),
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)
          setShowSuccess(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  // Auto-hide success message after 4 seconds
  useEffect(() => {
    if (showSuccess && confirmationType === 'message') {
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setHasSubmitted(false)
        formMethods.reset()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess, confirmationType, formMethods])

  // Show confirmation message if submitted
  if (!isLoading && showSuccess && confirmationType === 'message') {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        {confirmationMessage && <RichText data={confirmationMessage} />}
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <FormProvider {...formMethods}>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{`${error.status || '500'}: ${error.message || ''}`}</p>
            </div>
          )}
          {!hasSubmitted && !showSuccess && (
            <form id={formID.toString()} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                {form &&
                  form.fields &&
                  form.fields?.map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div key={index}>
                          <Field
                            form={form}
                            {...field}
                            {...formMethods}
                            register={register}
                            errors={errors}
                            showLabel={showLabel}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button
                form={formID.toString()}
                type="submit"
                size="lg"
                className="w-full flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <IconLoading className=" text-white size-10" />
                ) : (
                  submitButtonLabel || 'Gửi'
                )}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
