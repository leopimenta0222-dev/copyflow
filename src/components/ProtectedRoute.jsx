import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { useLang } from '../context/LangProvider'
import { Loading } from './ui'

export function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  const { t } = useLang()
  const location = useLocation()

  if (loading) return <Loading label={t('ui.loading')} />
  if (!session) return <Navigate to="/entrar" replace state={{ from: location.pathname }} />
  return children
}
