import './globals.css'
import { AuthProvider } from './context/AuthContext'

export const metadata = {
  title: 'Climate-Aware Crop Stress Monitoring',
  description: 'Monitor and manage crop stress conditions in real-time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
