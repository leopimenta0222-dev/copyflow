import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Generator } from './pages/Generator'
import { History } from './pages/History'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<ProtectedRoute><Generator /></ProtectedRoute>} />
        <Route path="/historico" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/entrar" element={<Login />} />
    </Routes>
  )
}
