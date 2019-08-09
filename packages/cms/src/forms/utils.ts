import { lensPath, view } from 'ramda'

import { FormHandlers } from './types'

type ResultError = {
  subject: string
  message?: string
}

function extractData<T>(
  result: any,
  name: string
): { result: T; error: ResultError } {
  return view(lensPath(['data', name]), result)
}

interface HandleFormSubmitParams<T> extends FormHandlers<T> {
  values: any
  setSubmitting: (p: boolean) => void
  extractPath: string
}

export async function handleFormSubmit<T, P, I>({
  values,
  handleSubmit,
  onSuccess,
  onFail,
  setSubmitting,
  extractPath
}: HandleFormSubmitParams<I>) {
  try {
    onSuccess && onSuccess(true)
  } catch (error) {
    console.log(error)
    onFail && onFail(error)
  }
  setSubmitting(false)
}
