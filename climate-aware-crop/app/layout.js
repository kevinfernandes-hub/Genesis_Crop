import './globals.css'

export const metadata = {
  title: 'Climate-Aware Crop Stress Monitoring',
  description: 'Monitor and manage crop stress conditions in real-time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
