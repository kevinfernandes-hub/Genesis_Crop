// Placeholder: MainLayout component
// Wraps all authenticated pages with header, sidebar, and footer

import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <main style={{ padding: '1rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
