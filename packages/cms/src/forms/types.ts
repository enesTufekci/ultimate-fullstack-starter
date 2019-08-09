export interface FormHandlers<T> {
  handleSubmit: (data: T) => any
  onSuccess?: (params: any) => void
  onFail?: (params: any) => void
}
