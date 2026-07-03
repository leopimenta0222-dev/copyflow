import { createContext, useContext, useCallback, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { TRANSLATIONS } from '../lib/translations'

const LangContext = createContext(null)
const STORAGE_KEY = 'copyflow.lang'

const readInitial = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch { /* localStorage indisponível */ }
  return 'pt'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readInitial)
  const qc = useQueryClient()

  const setLang = useCallback((next) => {
    setLangState(next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* ignore */ }
    // No modo demo o histórico é semeado por idioma (chaves de localStorage
    // distintas); invalida as queries pra a UI refletir o histórico do idioma novo.
    qc.invalidateQueries({ queryKey: ['generations'] })
  }, [qc])

  const t = useCallback(
    (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.pt[key] ?? key,
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
