import * as React from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = React.useCallback(({ title, description, action }: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((toasts) => [...toasts, { id, title, description, action }])
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  }, [])

  return {
    toasts,
    toast,
    dismiss,
  }
} 