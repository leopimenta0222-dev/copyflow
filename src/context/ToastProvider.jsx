import { createContext, useContext, useCallback, useState } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)
let counter = 0

const STYLES = {
  success: { icon: CheckCircle2, cls: 'text-[var(--color-teal)]' },
  error: { icon: AlertCircle, cls: 'text-red-400' },
  info: { icon: Info, cls: 'text-[var(--color-text)]' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const show = useCallback((message, type = 'success') => {
    const id = ++counter
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => remove(id), 3200)
  }, [remove])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[70] flex w-[min(92vw,340px)] flex-col gap-2">
        {toasts.map((t) => {
          const { icon: Icon, cls } = STYLES[t.type] || STYLES.info
          return (
            <div key={t.id} className="reveal flex items-start gap-2.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm shadow-[var(--shadow-card)]">
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${cls}`} />
              <span className="flex-1 text-[var(--color-text)]">{t.message}</span>
              <button onClick={() => remove(t.id)} className="text-[var(--color-faint)] transition-colors hover:text-[var(--color-text)]">
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
