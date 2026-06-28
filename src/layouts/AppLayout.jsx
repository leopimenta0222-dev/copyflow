import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
